-- ============================================================
-- NINI BARE — CATALOG SEED
-- Migration 006
-- ============================================================

-- ------------------------------------------------------------
-- Categories
-- ------------------------------------------------------------

insert into public.categories (
  id,
  slug,
  name,
  description,
  sort_order,
  status
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'women',
    'Women',
    'Curated essentials and lifestyle pieces for women.',
    1,
    'active'
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'men',
    'Men',
    'Everyday essentials and lifestyle pieces for men.',
    2,
    'active'
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'lingerie',
    'Lingerie',
    'Soft, elegant and comfortable intimate pieces.',
    3,
    'active'
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'unisex',
    'Unisex',
    'Comfortable lifestyle pieces designed for everyone.',
    4,
    'active'
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  status = excluded.status;


-- ------------------------------------------------------------
-- Products
-- ------------------------------------------------------------

insert into public.products (
  id,
  slug,
  name,
  short_description,
  description,
  status,
  featured,
  price_minor,
  currency,
  published_at
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    'essential-set',
    'Essential Set',
    'A clean everyday essential designed for comfort.',
    'A versatile everyday essential with a clean, comfortable feel and timeless Nini Bare styling.',
    'active',
    true,
    1800000,
    'NGN',
    '2026-09-01T00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    'everyday-essential',
    'Everyday Essential',
    'A comfortable everyday essential for men.',
    'A practical everyday piece designed around comfort, simplicity and easy daily wear.',
    'active',
    true,
    2200000,
    'NGN',
    '2026-09-01T00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    'soft-lace-set',
    'Soft Lace Set',
    'A soft and elegant lace set.',
    'A delicate lace set combining softness, comfort and understated elegance.',
    'active',
    false,
    1600000,
    'NGN',
    '2026-09-01T00:00:00+00'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    'classic-lounge-set',
    'Classic Lounge Set',
    'A relaxed unisex set made for everyday comfort.',
    'A comfortable lounge set designed for relaxed everyday wear across the Nini Bare collection.',
    'active',
    false,
    2500000,
    'NGN',
    '2026-09-01T00:00:00+00'
  )
on conflict (slug) do update
set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  status = excluded.status,
  featured = excluded.featured,
  price_minor = excluded.price_minor,
  currency = excluded.currency,
  published_at = excluded.published_at;


-- ------------------------------------------------------------
-- Product / Category relationships
-- ------------------------------------------------------------

insert into public.product_categories (
  product_id,
  category_id
)
values
  (
    '20000000-0000-4000-8000-000000000001',
    '10000000-0000-4000-8000-000000000001'
  ),
  (
    '20000000-0000-4000-8000-000000000002',
    '10000000-0000-4000-8000-000000000002'
  ),
  (
    '20000000-0000-4000-8000-000000000003',
    '10000000-0000-4000-8000-000000000003'
  ),
  (
    '20000000-0000-4000-8000-000000000004',
    '10000000-0000-4000-8000-000000000004'
  )
on conflict (product_id, category_id) do nothing;


-- ------------------------------------------------------------
-- Product variants
-- ------------------------------------------------------------

insert into public.product_variants (
  id,
  product_id,
  sku,
  size,
  active
)
values
  (
    '30000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'NB-ESS-S',
    'S',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000001',
    'NB-ESS-M',
    'M',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000001',
    'NB-ESS-L',
    'L',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000001',
    'NB-ESS-XL',
    'XL',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000005',
    '20000000-0000-4000-8000-000000000002',
    'NB-EVE-S',
    'S',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000006',
    '20000000-0000-4000-8000-000000000002',
    'NB-EVE-M',
    'M',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000007',
    '20000000-0000-4000-8000-000000000002',
    'NB-EVE-L',
    'L',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000008',
    '20000000-0000-4000-8000-000000000002',
    'NB-EVE-XL',
    'XL',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000009',
    '20000000-0000-4000-8000-000000000003',
    'NB-LAC-S',
    'S',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000010',
    '20000000-0000-4000-8000-000000000003',
    'NB-LAC-M',
    'M',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000011',
    '20000000-0000-4000-8000-000000000003',
    'NB-LAC-L',
    'L',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000012',
    '20000000-0000-4000-8000-000000000003',
    'NB-LAC-XL',
    'XL',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000013',
    '20000000-0000-4000-8000-000000000004',
    'NB-LOU-S',
    'S',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000014',
    '20000000-0000-4000-8000-000000000004',
    'NB-LOU-M',
    'M',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000015',
    '20000000-0000-4000-8000-000000000004',
    'NB-LOU-L',
    'L',
    true
  ),
  (
    '30000000-0000-4000-8000-000000000016',
    '20000000-0000-4000-8000-000000000004',
    'NB-LOU-XL',
    'XL',
    true
  )
on conflict (sku) do update
set
  product_id = excluded.product_id,
  size = excluded.size,
  active = excluded.active;


-- ------------------------------------------------------------
-- Product images
-- ------------------------------------------------------------

insert into public.product_images (
  id,
  product_id,
  storage_path,
  alt_text,
  sort_order,
  image_role
)
values
  (
    '40000000-0000-4000-8000-000000000001',
    '20000000-0000-4000-8000-000000000001',
    'products/essential-set/primary.jpg',
    'Essential Set',
    0,
    'primary'
  ),
  (
    '40000000-0000-4000-8000-000000000002',
    '20000000-0000-4000-8000-000000000002',
    'products/everyday-essential/primary.jpg',
    'Everyday Essential',
    0,
    'primary'
  ),
  (
    '40000000-0000-4000-8000-000000000003',
    '20000000-0000-4000-8000-000000000003',
    'products/soft-lace-set/primary.jpg',
    'Soft Lace Set',
    0,
    'primary'
  ),
  (
    '40000000-0000-4000-8000-000000000004',
    '20000000-0000-4000-8000-000000000004',
    'products/classic-lounge-set/primary.jpg',
    'Classic Lounge Set',
    0,
    'primary'
  )
on conflict (id) do nothing;


-- ------------------------------------------------------------
-- Inventory levels
-- ------------------------------------------------------------

insert into public.inventory_levels (
  variant_id,
  quantity_on_hand,
  quantity_reserved
)
values
  ('30000000-0000-4000-8000-000000000001', 10, 0),
  ('30000000-0000-4000-8000-000000000002', 10, 0),
  ('30000000-0000-4000-8000-000000000003',  8, 0),
  ('30000000-0000-4000-8000-000000000004',  5, 0),

  ('30000000-0000-4000-8000-000000000005',  8, 0),
  ('30000000-0000-4000-8000-000000000006', 10, 0),
  ('30000000-0000-4000-8000-000000000007',  8, 0),
  ('30000000-0000-4000-8000-000000000008',  5, 0),

  ('30000000-0000-4000-8000-000000000009',  6, 0),
  ('30000000-0000-4000-8000-000000000010',  8, 0),
  ('30000000-0000-4000-8000-000000000011',  6, 0),
  ('30000000-0000-4000-8000-000000000012',  0, 0),

  ('30000000-0000-4000-8000-000000000013',  5, 0),
  ('30000000-0000-4000-8000-000000000014',  7, 0),
  ('30000000-0000-4000-8000-000000000015',  5, 0),
  ('30000000-0000-4000-8000-000000000016',  3, 0)
on conflict (variant_id) do nothing;


-- ------------------------------------------------------------
-- Inventory opening-balance audit trail
-- ------------------------------------------------------------

insert into public.inventory_movements (
  variant_id,
  movement_type,
  quantity,
  reference,
  note
)
select
  il.variant_id,
  'opening_balance',
  il.quantity_on_hand,
  'catalog-seed-006',
  'Initial Nini Bare catalog inventory.'
from public.inventory_levels il
where il.quantity_on_hand > 0
  and not exists (
  select 1
  from public.inventory_movements im
  where im.variant_id = il.variant_id
    and im.movement_type = 'opening_balance'
    and im.reference = 'catalog-seed-006'
);
