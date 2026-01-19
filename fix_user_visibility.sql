-- 1. Backfill Emails for EXISTING users (Crucial step!)
UPDATE public.profiles p
SET email = u.email
FROM auth.users u
WHERE p.id = u.id
AND p.email IS NULL;

-- 2. Backfill Phone numbers if possible (from auth metadata)
-- This tries to pull phone from the auth.users metadata if it exists there
UPDATE public.profiles p
SET phone = (u.raw_user_meta_data->>'phone')::text
FROM auth.users u
WHERE p.id = u.id
AND p.phone IS NULL
AND u.raw_user_meta_data->>'phone' IS NOT NULL;

-- 3. Ensure Admins can see ALL profiles (RLS Policy)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    -- Drop policy if it exists to avoid conflicts
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Admins can view all profiles'
    ) THEN
        DROP POLICY "Admins can view all profiles" ON public.profiles;
    END IF;
END $$;

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  -- Check if the requesting user is an admin
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 4. Ensure Users can update their OWN profile (if not already set)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' 
        AND policyname = 'Users can update own profile'
    ) THEN
        DROP POLICY "Users can update own profile" ON public.profiles;
    END IF;
END $$;

CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING ( id = auth.uid() );
