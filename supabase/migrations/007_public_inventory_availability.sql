create or replace function public.get_public_variant_availability(
  p_variant_ids uuid[]
)
returns table (
  variant_id uuid,
  availability text
)
language sql
security definer
set search_path = ''
stable
as $$
  select
    v.id as variant_id,
    case
      when coalesce(i.quantity_on_hand - i.quantity_reserved, 0) > 0
        then 'in_stock'
      else 'out_of_stock'
    end as availability
  from public.product_variants v
  left join public.inventory_levels i
    on i.variant_id = v.id
  where v.id = any(p_variant_ids)
    and v.active = true;
$$;

revoke execute
  on function public.get_public_variant_availability(uuid[])
  from public;

revoke execute
  on function public.get_public_variant_availability(uuid[])
  from anon;

revoke execute
  on function public.get_public_variant_availability(uuid[])
  from authenticated;

grant execute
  on function public.get_public_variant_availability(uuid[])
  to anon;

grant execute
  on function public.get_public_variant_availability(uuid[])
  to authenticated;
