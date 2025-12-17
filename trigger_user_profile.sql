-- Create a trigger function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    'user' -- Default role
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill script for existing users who might be missing a profile
insert into public.profiles (id, full_name, role)
select id, raw_user_meta_data->>'full_name', 'user'
from auth.users
where id not in (select id from public.profiles)
on conflict (id) do nothing;
