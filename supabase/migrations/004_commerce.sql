create type public.order_status as enum (
  'pending',
  'awaiting_payment',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

create type public.payment_status as enum (
  'pending',
  'initialized',
  'paid',
  'failed',
  'refunded'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  first_name text,
  last_name text,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  country text not null default 'Nigeria',
  phone text,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,

  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  country text not null default 'Nigeria',

  subtotal_minor bigint not null
    check (subtotal_minor >= 0),

  delivery_fee_minor bigint not null default 0
    check (delivery_fee_minor >= 0),

  total_minor bigint not null
    check (total_minor >= 0),

  constraint orders_total_matches_parts
    check (total_minor = subtotal_minor + delivery_fee_minor),

  currency text not null default 'NGN'
    check (currency = 'NGN'),

  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',

  payment_reference text unique,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null
    references public.orders(id) on delete cascade,

  product_id uuid
    references public.products(id) on delete set null,

  variant_id uuid
    references public.product_variants(id) on delete set null,

  sku text not null,
  product_name text not null,
  product_slug text not null,

  size text,
  color text,

  unit_price_minor bigint not null
    check (unit_price_minor >= 0),

  quantity integer not null
    check (quantity > 0),

  image_url text,
  image_alt text,

  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique
    references public.orders(id) on delete cascade,

  provider text not null default 'paystack'
    check (provider = 'paystack'),

  reference text not null unique,

  amount_minor bigint not null
    check (amount_minor >= 0),

  currency text not null default 'NGN'
    check (currency = 'NGN'),

  status public.payment_status not null default 'pending',

  paid_at timestamptz,
  channel text,
  gateway_response text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.payment_events (
  id uuid primary key default gen_random_uuid(),

  payment_id uuid
    references public.payments(id) on delete set null,

  provider text not null default 'paystack'
    check (provider = 'paystack'),

  event_type text not null,
  event_reference text,

  payload jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create unique index payment_events_provider_reference_idx
  on public.payment_events(provider, event_reference)
  where event_reference is not null;

create index profiles_email_idx
  on public.profiles(email);

create index addresses_user_id_idx
  on public.addresses(user_id);

create index orders_user_id_idx
  on public.orders(user_id);

create index orders_status_idx
  on public.orders(status);

create index orders_payment_status_idx
  on public.orders(payment_status);

create index orders_created_at_idx
  on public.orders(created_at desc);

create index order_items_order_id_idx
  on public.order_items(order_id);

create index order_items_product_id_idx
  on public.order_items(product_id);

create index order_items_variant_id_idx
  on public.order_items(variant_id);

create index payments_status_idx
  on public.payments(status);

create index payments_created_at_idx
  on public.payments(created_at desc);

create index payment_events_payment_id_idx
  on public.payment_events(payment_id);

create index payment_events_created_at_idx
  on public.payment_events(created_at desc);

alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.payment_events enable row level security;
