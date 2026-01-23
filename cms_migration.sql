-- Site Settings (Singleton Table)
create table public.site_settings (
  id uuid default gen_random_uuid() primary key,
  site_name text default 'OKIKE',
  description text default 'Empowering businesses with cutting-edge digital solutions.',
  contact_email text default 'contact@okike.com',
  phone text default '+1 (555) 123-4567',
  address text default '123 Digital Ave, Tech City',
  primary_color text default '#2563EB', -- Default Blue-600
  social_links jsonb default '{"twitter": "", "linkedin": "", "facebook": "", "instagram": ""}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure only one row exists
create unique index site_settings_one_row_idx on public.site_settings ((true));

-- Initial seed
insert into public.site_settings (site_name) values ('OKIKE') on conflict do nothing;

-- RLS for Site Settings
alter table public.site_settings enable row level security;
create policy "Public Read Access" on public.site_settings for select using (true);
create policy "Admins Update Access" on public.site_settings for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);


-- Blogs Table
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text not null, -- Markdown or HTML
  excerpt text,
  cover_image text,
  author_id uuid references auth.users,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Blogs
alter table public.blogs enable row level security;
create policy "Public Read Published Blogs" on public.blogs for select using (is_published = true);
create policy "Admins Manage Blogs" on public.blogs for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);


-- Portfolio/Projects Table
create table public.projects_portfolio (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null, -- e.g., 'Web Development', 'Mobile App'
  image_url text, -- Main showcase image
  description text,
  live_link text,
  github_link text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Portfolio
alter table public.projects_portfolio enable row level security;
create policy "Public Read All Projects" on public.projects_portfolio for select using (true);
create policy "Admins Manage Projects" on public.projects_portfolio for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);


-- Courses Table
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  price decimal(10, 2) default 0.00,
  duration text, -- e.g., '4 weeks'
  level text, -- e.g., 'Beginner', 'Advanced'
  image_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Courses
alter table public.courses enable row level security;
create policy "Public Read Active Courses" on public.courses for select using (active = true);
create policy "Admins Manage Courses" on public.courses for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Buckets for Content Images (if not exists)
-- This usually requires manual setup or using the storage API, but here is the intent:
-- insert into storage.buckets (id, name, public) values ('content-images', 'content-images', true);
