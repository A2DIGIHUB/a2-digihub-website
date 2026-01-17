-- Add phone column to profiles if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update the handle_new_user function to copy phone if avail (optional, depends on auth setup)
-- For now, we just ensure the column exists for manual entry or future auth sync
