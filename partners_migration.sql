-- Create partners table
create table if not exists public.partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  website_url text,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.partners enable row level security;

-- Policies for partners table
create policy "Public partners access"
  on public.partners for select
  using ( true );

create policy "Admin partners access"
  on public.partners for all
  using ( 
    exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
  );

-- Create storage bucket for partners
insert into storage.buckets (id, name, public)
values ('partners', 'partners', true)
on conflict (id) do nothing;

-- Storage policies for partners bucket
create policy "Public Access Partners"
on storage.objects for select
using ( bucket_id = 'partners' );

create policy "Admin Upload Partners"
on storage.objects for insert
with check ( 
  bucket_id = 'partners' 
  and auth.role() = 'authenticated'
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

create policy "Admin Update Partners"
on storage.objects for update
using ( 
  bucket_id = 'partners' 
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

create policy "Admin Delete Partners"
on storage.objects for delete
using ( 
  bucket_id = 'partners' 
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);
