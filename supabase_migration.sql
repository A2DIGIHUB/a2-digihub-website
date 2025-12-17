-- Create notifications table
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  message text not null,
  is_read boolean default false,
  type text check (type in ('info', 'success', 'warning', 'error')) default 'info',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Policies for notifications
create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications (mark as read)"
  on public.notifications for update
  using (auth.uid() = user_id);

-- Add avatar_url and settings to profiles if not exists
alter table public.profiles 
add column if not exists avatar_url text,
add column if not exists preferences jsonb default '{}'::jsonb;

-- Storage bucket for avatars (handled via API/Dashboard usually, but script stub here)
-- insert into storage.buckets (id, name) values ('avatars', 'avatars');
-- Policy for avatars would be public read, authenticated upload
