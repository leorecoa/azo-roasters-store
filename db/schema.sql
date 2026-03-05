-- extensions
create extension if not exists "pgcrypto";

-- profiles: vincula auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer', -- 'customer' | 'admin'
  created_at timestamptz not null default now()
);

-- products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  category text not null, -- 'cafe' | 'acessorio' | 'curso'
  active boolean not null default true,
  image_path text, -- storage path
  theme jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- variants: peso/moagem/ingresso curso etc
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text unique,
  name text not null,          -- ex: "250g • Em grãos" / "500g • Espresso" / "Turma Março"
  price_cents int not null,
  stock int,                   -- null para curso/serviço
  attributes jsonb not null default '{}'::jsonb, -- { weight: "250g", grind: "grãos", roast: "média" }
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete restrict,
  status text not null default 'created', -- created|paid|canceled|fulfilled
  subtotal_cents int not null default 0,
  shipping_cents int not null default 0,
  total_cents int not null default 0,
  payment_provider text, -- 'stripe' etc
  payment_ref text,
  created_at timestamptz not null default now()
);

-- order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  quantity int not null check (quantity > 0),
  unit_price_cents int not null
);

-- trigger updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- policies: products readable by everyone, write only admin
create policy "products_read" on public.products
for select using (active = true);

create policy "variants_read" on public.product_variants
for select using (active = true);

-- orders: only owner or admin
create policy "orders_owner_read" on public.orders
for select using (auth.uid() = user_id);

create policy "orders_owner_write" on public.orders
for insert with check (auth.uid() = user_id);

create policy "order_items_owner_read" on public.order_items
for select using (
  exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  )
);

create policy "order_items_owner_write" on public.order_items
for insert with check (
  exists (
    select 1 from public.orders o
    where o.id = order_id and o.user_id = auth.uid()
  )
);

-- admin helper: check role
create or replace function public.is_admin()
returns boolean as $$
  select exists(
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
$$ language sql stable;

-- admin write policies
create policy "products_admin_write" on public.products
for all using (public.is_admin()) with check (public.is_admin());

create policy "variants_admin_write" on public.product_variants
for all using (public.is_admin()) with check (public.is_admin());

create policy "orders_admin_read" on public.orders
for select using (public.is_admin());

create policy "order_items_admin_read" on public.order_items
for select using (public.is_admin());

-- profiles: user can read/update own profile; admin can read all
create policy "profile_owner_read" on public.profiles
for select using (auth.uid() = id or public.is_admin());

create policy "profile_owner_write" on public.profiles
for insert with check (auth.uid() = id);

create policy "profile_owner_update" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);
