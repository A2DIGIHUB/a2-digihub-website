-- Change sender_id to reference public.profiles instead of auth.users
-- This allows Supabase (PostgREST) to correctly join project_messages with profiles
-- so we can fetch full_name and avatar_url.

DO $$
BEGIN
    -- Drop the old constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'project_messages_sender_id_fkey' 
        AND table_name = 'project_messages'
    ) THEN
        ALTER TABLE public.project_messages
        DROP CONSTRAINT project_messages_sender_id_fkey;
    END IF;
END $$;

-- Add the new constraint referencing profiles
ALTER TABLE public.project_messages
ADD CONSTRAINT project_messages_sender_id_fkey
FOREIGN KEY (sender_id)
REFERENCES public.profiles(id)
ON DELETE CASCADE;
