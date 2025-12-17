-- Create 'avatars' bucket
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Create 'content-images' bucket
insert into storage.buckets (id, name, public)
values ('content-images', 'content-images', true)
on conflict (id) do nothing;

-- Policy: Give public access to 'avatars'
create policy "Public Access Avatars"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Policy: Allow authenticated users to upload avatars
create policy "Authenticated Upload Avatars"
on storage.objects for insert
with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );


-- Policy: Give public access to 'content-images'
create policy "Public Access Content Images"
on storage.objects for select
using ( bucket_id = 'content-images' );

-- Policy: Allow Admins to upload content images
-- Note: Checking specific role usually requires a join or helper function. 
-- For simplicity, we'll allow authenticated users for now, or you can restrict client-side.
-- Ideally: (bucket_id = 'content-images' and (select role from profiles where id = auth.uid()) = 'admin')
create policy "Admin Upload Content Images"
on storage.objects for insert
with check ( 
  bucket_id = 'content-images' 
  and auth.role() = 'authenticated'
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

-- Allow Admins to update/delete content images
create policy "Admin Update Content Images"
on storage.objects for update
using ( 
  bucket_id = 'content-images' 
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);

create policy "Admin Delete Content Images"
on storage.objects for delete
using ( 
  bucket_id = 'content-images' 
  and exists ( select 1 from public.profiles where id = auth.uid() and role = 'admin' )
);
