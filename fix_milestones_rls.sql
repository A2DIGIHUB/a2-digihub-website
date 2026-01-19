-- FIX: Ensure Admin CRUD for Milestones
-- Problem: We need to ensure Admins can Insert, Update, and Delete milestones.
-- We will use the 'is_admin()' function if it exists, or fall back to a direct check.

-- 1. Enable RLS
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;

-- 2. Drop old policies to avoid conflicts
DROP POLICY IF EXISTS "Admins can manage milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Admins can insert milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Admins can update milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Admins can delete milestones" ON public.project_milestones;
DROP POLICY IF EXISTS "Users can view milestones" ON public.project_milestones;

-- 3. Policy: View (Admins + Owner)
CREATE POLICY "Users can view milestones"
ON public.project_milestones
FOR SELECT
USING (
  -- Admin
  (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'))
  OR
  -- Project Owner (via join to quotes)
  (EXISTS (
    SELECT 1 FROM public.quotes 
    WHERE quotes.id = project_milestones.quote_id 
    AND quotes.user_id = auth.uid()
  ))
);

-- 4. Policy: Admin Full Management (Insert, Update, Delete)
CREATE POLICY "Admins can manage milestones"
ON public.project_milestones
FOR ALL
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
)
WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
