create extension if not exists "pgcrypto";

create type public.product_status as enum (
  'draft',
  'active',
  'archived'
);

create type public.category_status as enum (
  'active',
  'archived'
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  image_url text,
  image_alt text,
  sort_order integer not null default 0,
  status public.category_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null default '',
  description text not null default '',
  status public.product_status not null default 'draft',
  featured boolean not null default false,
  price_minor bigint not null check (price_minor >= 0),
  compare_at_price_minor bigint
    check (
      compare_at_price_minor is null
      or compare_at_price_minor >= 0
    ),
  currency text not null default 'NGN'
    check (currency = 'NGN'),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_categories (
  product_id uuid not null references public.products(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, category_id)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  size text,
  color text,
  price_minor bigint
    check (price_minor is null or price_minor >= 0),
  compare_at_price_minor bigint
    check (
      compare_at_price_minor is null
      or compare_at_price_minor >= 0
    ),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  image_role text not null default 'gallery',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_status_idx
  on public.products(status);

create index products_featured_idx
  on public.products(featured)
  where featured = true;

create index product_categories_category_id_idx
  on public.product_categories(category_id);

create index product_variants_product_id_idx
  on public.product_variants(product_id);

create index product_images_product_id_idx
  on public.product_images(product_id);

create unique index product_variants_product_size_color_idx
  on public.product_variants (
    product_id,
    coalesce(size, ''),
    coalesce(color, '')
  );
