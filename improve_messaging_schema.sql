-- 1. Add email and phone columns to profiles if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS phone text;

-- 2. Create a function to copy email from auth.users to public.profiles on signup/update
CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create a trigger to automaticall sync email updates
DROP TRIGGER IF EXISTS on_auth_user_update ON auth.users;
CREATE TRIGGER on_auth_user_update
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- 4. One-time update for existing users (Run this manually in Supabase SQL editor if needed)
-- UPDATE public.profiles p
-- SET email = u.email
-- FROM auth.users u
-- WHERE p.id = u.id;

-- 5. Create specific Project Messages table (Better than generic activities)
CREATE TABLE IF NOT EXISTS public.project_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id uuid REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. RLS for Messages
ALTER TABLE public.project_messages ENABLE ROW LEVEL SECURITY;

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
  ON public.project_messages FOR SELECT
  USING ( 
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Users can view messages for their own projects
CREATE POLICY "Users can view messages for their own projects"
  ON public.project_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.quotes
      WHERE quotes.id = project_messages.project_id
      AND quotes.user_id = auth.uid()
    )
  );

-- Admins can insert messages
CREATE POLICY "Admins can send messages"
  ON public.project_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Users can insert messages to their own projects
CREATE POLICY "Users can send messages to their own projects"
  ON public.project_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.quotes
      WHERE quotes.id = project_messages.project_id
      AND quotes.user_id = auth.uid()
    )
  );
