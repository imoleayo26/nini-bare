alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_categories enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;


drop policy if exists "public can read active categories"
on public.categories;

create policy "public can read active categories"
on public.categories
for select
to anon, authenticated
using (
  status = 'active'
);


drop policy if exists "public can read active products"
on public.products;

create policy "public can read active products"
on public.products
for select
to anon, authenticated
using (
  status = 'active'
);


drop policy if exists "public can read active product categories"
on public.product_categories;

create policy "public can read active product categories"
on public.product_categories
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products p
    join public.categories c
      on c.id = product_categories.category_id
    where p.id = product_categories.product_id
      and p.status = 'active'
      and c.status = 'active'
  )
);


drop policy if exists "public can read active product variants"
on public.product_variants;

create policy "public can read active product variants"
on public.product_variants
for select
to anon, authenticated
using (
  active = true
  and exists (
    select 1
    from public.products p
    where p.id = product_variants.product_id
      and p.status = 'active'
  )
);


drop policy if exists "public can read active product images"
on public.product_images;

create policy "public can read active product images"
on public.product_images
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products p
    where p.id = product_images.product_id
      and p.status = 'active'
  )
);


grant select on public.categories
to anon, authenticated;

grant select on public.products
to anon, authenticated;

grant select on public.product_categories
to anon, authenticated;

grant select on public.product_variants
to anon, authenticated;

grant select on public.product_images
to anon, authenticated;
