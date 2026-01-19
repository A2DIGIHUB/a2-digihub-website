-- FIX: Infinite Recursion in RLS Policy
-- Problem: The 'Admins can view all profiles' policy was checking the 'profiles' table, 
-- which triggered the policy again, creating a loop.
-- Solution: Use a SECURITY DEFINER function to check the role. This function runs 
-- with higher privileges and bypasses the RLS check, breaking the loop.

-- 1. Create the secure helper function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Clean up old policies to start fresh
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- 3. Define the new Read Policies

-- Policy A: Everyone can view their OWN profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id
);

-- Policy B: Admins can view ALL profiles (using the safe function)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  is_admin()
);
