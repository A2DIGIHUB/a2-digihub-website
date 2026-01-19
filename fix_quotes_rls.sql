-- FIX: Missing UPDATE/DELETE policies for Quotes
-- Problem: The 'quotes' table had RLS enabled but no policies for UPDATE or DELETE,
-- effectively making the table read-only for updates.

-- 1. Helper function for admin check (reusing the one we made, or defining a safe fallback)
-- We'll just use the direct check to be safe in case the function script wasn't run.

-- 2. Policy: Admins can UPDATE quotes (e.g., change status)
CREATE POLICY "Admins can update all quotes"
ON public.quotes
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 3. Policy: Admins can DELETE quotes
CREATE POLICY "Admins can delete quotes"
ON public.quotes
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- 4. Policy: Users can update their OWN quotes (optional, e.g. editing details before approval)
-- Only allow updates if status is 'pending' to prevent changing approved contracts
CREATE POLICY "Users can update own pending quotes"
ON public.quotes
FOR UPDATE
USING (
  auth.uid() = user_id 
  AND status = 'pending'
);
