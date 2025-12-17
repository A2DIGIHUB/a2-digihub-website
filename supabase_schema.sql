-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create a table for public profiles
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  role text default 'user' check (role in ('user', 'admin')),

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create a table for quotes/projects
create table public.quotes (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.profiles(id),
  service_type text not null,
  package_type text,
  estimated_price text,
  timeline text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'completed')),
  details jsonb
);

-- RLS for quotes
alter table public.quotes enable row level security;

create policy "Users can view their own quotes"
  on quotes for select
  using ( auth.uid() = user_id );

create policy "Users can enable their own quotes"
  on quotes for insert
  with check ( auth.uid() = user_id );

create policy "Admins can view all quotes"
  on quotes for select
  using ( 
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );
