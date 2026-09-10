create type public.inventory_movement_type as enum (
  'opening_balance',
  'purchase',
  'reservation',
  'reservation_release',
  'sale',
  'adjustment',
  'return',
  'restock'
);

create type public.inventory_reservation_status as enum (
  'active',
  'released',
  'consumed',
  'expired',
  'cancelled'
);

create table public.inventory_levels (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null unique
    references public.product_variants(id) on delete cascade,
  quantity_on_hand integer not null default 0
    check (quantity_on_hand >= 0),
  quantity_reserved integer not null default 0
    check (quantity_reserved >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint inventory_reserved_not_above_stock
    check (quantity_reserved <= quantity_on_hand)
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null
    references public.product_variants(id) on delete restrict,
  movement_type public.inventory_movement_type not null,
  quantity integer not null
    check (quantity > 0),
  reference text,
  note text,
  created_at timestamptz not null default now()
);

create table public.inventory_reservations (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null
    references public.product_variants(id) on delete restrict,
  quantity integer not null
    check (quantity > 0),
  status public.inventory_reservation_status not null default 'active',
  reference text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  released_at timestamptz
);

create index inventory_movements_variant_id_idx
  on public.inventory_movements(variant_id);

create index inventory_movements_created_at_idx
  on public.inventory_movements(created_at desc);

create index inventory_reservations_variant_id_idx
  on public.inventory_reservations(variant_id);

create index inventory_reservations_active_idx
  on public.inventory_reservations(variant_id, status)
  where status = 'active';

create index inventory_reservations_expires_at_idx
  on public.inventory_reservations(expires_at)
  where status = 'active';

alter table public.inventory_levels enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.inventory_reservations enable row level security;
