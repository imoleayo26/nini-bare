create or replace function public.reserve_inventory(
  p_variant_id uuid,
  p_quantity integer,
  p_reference text default null,
  p_expires_at timestamptz default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_reservation_id uuid;
  v_quantity_on_hand integer;
  v_quantity_reserved integer;
begin
  if p_quantity <= 0 then
    raise exception 'Reservation quantity must be greater than zero.';
  end if;

  select
    quantity_on_hand,
    quantity_reserved
  into
    v_quantity_on_hand,
    v_quantity_reserved
  from public.inventory_levels
  where variant_id = p_variant_id
  for update;

  if not found then
    raise exception 'Inventory record not found for this variant.';
  end if;

  if v_quantity_on_hand - v_quantity_reserved < p_quantity then
    raise exception 'Insufficient inventory available.';
  end if;

  update public.inventory_levels
  set
    quantity_reserved = quantity_reserved + p_quantity,
    updated_at = now()
  where variant_id = p_variant_id;

  insert into public.inventory_reservations (
    variant_id,
    quantity,
    status,
    reference,
    expires_at
  )
  values (
    p_variant_id,
    p_quantity,
    'active',
    p_reference,
    p_expires_at
  )
  returning id into v_reservation_id;

  insert into public.inventory_movements (
    variant_id,
    movement_type,
    quantity,
    reference,
    note
  )
  values (
    p_variant_id,
    'reservation',
    p_quantity,
    p_reference,
    'Inventory reserved for checkout.'
  );

  return v_reservation_id;
end;
$$;


create or replace function public.release_inventory_reservation(
  p_reservation_id uuid,
  p_reference text default null
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_variant_id uuid;
  v_quantity integer;
  v_status public.inventory_reservation_status;
  v_reference text;
begin
  select
    variant_id,
    quantity,
    status,
    reference
  into
    v_variant_id,
    v_quantity,
    v_status,
    v_reference
  from public.inventory_reservations
  where id = p_reservation_id
  for update;

  if not found then
    raise exception 'Inventory reservation not found.';
  end if;

  if v_status <> 'active' then
    return false;
  end if;

  update public.inventory_levels
  set
    quantity_reserved = quantity_reserved - v_quantity,
    updated_at = now()
  where variant_id = v_variant_id;

  if not found then
    raise exception 'Inventory record not found for reservation.';
  end if;

  update public.inventory_reservations
  set
    status = 'released',
    released_at = now()
  where id = p_reservation_id;

  insert into public.inventory_movements (
    variant_id,
    movement_type,
    quantity,
    reference,
    note
  )
  values (
    v_variant_id,
    'reservation_release',
    v_quantity,
    coalesce(p_reference, v_reference),
    'Inventory reservation released.'
  );

  return true;
end;
$$;


revoke execute on function public.reserve_inventory(
  uuid,
  integer,
  text,
  timestamptz
) from public;

revoke execute on function public.reserve_inventory(
  uuid,
  integer,
  text,
  timestamptz
) from anon;

revoke execute on function public.reserve_inventory(
  uuid,
  integer,
  text,
  timestamptz
) from authenticated;


revoke execute on function public.release_inventory_reservation(
  uuid,
  text
) from public;

revoke execute on function public.release_inventory_reservation(
  uuid,
  text
) from anon;

revoke execute on function public.release_inventory_reservation(
  uuid,
  text
) from authenticated;
