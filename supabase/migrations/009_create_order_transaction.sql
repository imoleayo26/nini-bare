-- ============================================================
-- NINI BARE — TRANSACTIONAL ORDER CREATION
-- Migration 009
-- ============================================================

create or replace function public.create_order(
  p_first_name text,
  p_last_name text,
  p_email text,
  p_phone text,
  p_address_line1 text,
  p_address_line2 text,
  p_city text,
  p_state text,
  p_country text,
  p_subtotal_minor bigint,
  p_delivery_fee_minor bigint,
  p_total_minor bigint,
  p_items jsonb
)
returns table (
  order_id uuid,
  order_number text,
  status public.order_status,
  payment_status public.payment_status
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_item jsonb;
  v_product record;
  v_variant record;
  v_quantity integer;
  v_unit_price_minor bigint;
  v_calculated_subtotal bigint := 0;
begin
  -- ----------------------------------------------------------
  -- Basic order validation
  -- ----------------------------------------------------------

  if nullif(trim(p_first_name), '') is null then
    raise exception 'First name is required.';
  end if;

  if nullif(trim(p_last_name), '') is null then
    raise exception 'Last name is required.';
  end if;

  if nullif(trim(p_email), '') is null then
    raise exception 'Email is required.';
  end if;

  if nullif(trim(p_phone), '') is null then
    raise exception 'Phone number is required.';
  end if;

  if nullif(trim(p_address_line1), '') is null then
    raise exception 'Delivery address is required.';
  end if;

  if nullif(trim(p_city), '') is null then
    raise exception 'City is required.';
  end if;

  if nullif(trim(p_state), '') is null then
    raise exception 'State is required.';
  end if;

  if p_delivery_fee_minor is null or p_delivery_fee_minor < 0 then
    raise exception 'Invalid delivery fee.';
  end if;

  if jsonb_typeof(p_items) <> 'array'
     or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item.';
  end if;

  -- ----------------------------------------------------------
  -- Create the order first.
  -- Everything happens inside this transaction.
  -- If anything below fails, PostgreSQL rolls everything back.
  -- ----------------------------------------------------------

  v_order_number :=
    'NB-' ||
    to_char(now(), 'YYYYMMDD') ||
    '-' ||
    upper(
      substr(
        replace(gen_random_uuid()::text, '-', ''),
        1,
        8
      )
    );

  insert into public.orders (
    order_number,
    first_name,
    last_name,
    email,
    phone,
    address_line1,
    address_line2,
    city,
    state,
    country,
    subtotal_minor,
    delivery_fee_minor,
    total_minor,
    currency
  )
  values (
    v_order_number,
    trim(p_first_name),
    trim(p_last_name),
    lower(trim(p_email)),
    trim(p_phone),
    trim(p_address_line1),
    nullif(trim(coalesce(p_address_line2, '')), ''),
    trim(p_city),
    trim(p_state),
    coalesce(nullif(trim(p_country), ''), 'Nigeria'),
    0,
    p_delivery_fee_minor,
    p_delivery_fee_minor,
    'NGN'
  )
  returning id
  into v_order_id;

  -- ----------------------------------------------------------
  -- Process each requested cart item.
  --
  -- IMPORTANT:
  -- The client only supplies product_id, variant_id and quantity.
  -- Product name, SKU and price are read from the database.
  -- ----------------------------------------------------------

  for v_item in
    select value
    from jsonb_array_elements(p_items)
  loop

    if not (v_item ? 'product_id')
       or not (v_item ? 'variant_id')
       or not (v_item ? 'quantity') then
      raise exception 'Invalid order item.';
    end if;

    v_quantity := (v_item ->> 'quantity')::integer;

    if v_quantity <= 0 then
      raise exception 'Each item must have a valid quantity.';
    end if;

    -- --------------------------------------------------------
    -- Lock and verify the product/variant.
    -- --------------------------------------------------------

    select
      p.id,
      p.name,
      p.slug,
      p.status
    into v_product
    from public.products p
    where p.id = (v_item ->> 'product_id')::uuid
    for update;

    if not found then
      raise exception 'One or more products are no longer available.';
    end if;

    if v_product.status <> 'active' then
      raise exception 'One or more products are no longer available.';
    end if;

    select
      pv.id,
      pv.sku,
      pv.size,
      pv.color,
      pv.price_minor,
      pv.active
    into v_variant
    from public.product_variants pv
    where pv.id = (v_item ->> 'variant_id')::uuid
      and pv.product_id = v_product.id
    for update;

    if not found or not v_variant.active then
      raise exception 'One or more selected variants are invalid.';
    end if;

    -- --------------------------------------------------------
    -- Determine the authoritative price.
    -- Variant price wins; otherwise product price is used.
    -- --------------------------------------------------------

    v_unit_price_minor := v_variant.price_minor;

    if v_unit_price_minor is null then
      select p.price_minor
      into v_unit_price_minor
      from public.products p
      where p.id = v_product.id;
    end if;

    if v_unit_price_minor is null
       or v_unit_price_minor < 0 then
      raise exception 'Product price is invalid.';
    end if;

    v_calculated_subtotal :=
      v_calculated_subtotal +
      (v_unit_price_minor * v_quantity);

    -- --------------------------------------------------------
    -- Reserve inventory atomically.
    --
    -- The reservation function locks inventory and prevents
    -- two simultaneous checkouts from overselling the stock.
    -- --------------------------------------------------------

    perform public.reserve_inventory(
      v_variant.id,
      v_quantity,
      v_order_id::text,
      now() + interval '30 minutes'
    );

    -- --------------------------------------------------------
    -- Store an immutable snapshot of the product information
    -- used for this order.
    -- --------------------------------------------------------

    insert into public.order_items (
      order_id,
      product_id,
      variant_id,
      sku,
      product_name,
      product_slug,
      size,
      color,
      unit_price_minor,
      quantity,
      image_url,
      image_alt
    )
    values (
      v_order_id,
      v_product.id,
      v_variant.id,
      v_variant.sku,
      v_product.name,
      v_product.slug,
      v_variant.size,
      v_variant.color,
      v_unit_price_minor,
      v_quantity,
      null,
      null
    );

  end loop;

  -- ----------------------------------------------------------
  -- Authoritative subtotal/total.
  --
  -- Ignore the client-calculated subtotal and total.
  -- The database calculates them from real product prices.
  -- ----------------------------------------------------------

  update public.orders
  set
    subtotal_minor = v_calculated_subtotal,
    total_minor = v_calculated_subtotal + p_delivery_fee_minor,
    updated_at = now()
  where id = v_order_id;

  -- ----------------------------------------------------------
  -- Return the authoritative order result.
  -- ----------------------------------------------------------

  return query
  select
    o.id,
    o.order_number,
    o.status,
    o.payment_status
  from public.orders o
  where o.id = v_order_id;

end;
$$;

-- ------------------------------------------------------------
-- SECURITY
-- ------------------------------------------------------------

revoke execute
  on function public.create_order(
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    bigint,
    bigint,
    bigint,
    jsonb
  )
from public;

revoke execute
  on function public.create_order(
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    bigint,
    bigint,
    bigint,
    jsonb
  )
from anon;

revoke execute
  on function public.create_order(
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    bigint,
    bigint,
    bigint,
    jsonb
  )
from authenticated;

grant execute
  on function public.create_order(
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    text,
    bigint,
    bigint,
    bigint,
    jsonb
  )
to service_role;
