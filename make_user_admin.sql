-- REPLACE 'admin@example.com' WITH THE EMAIL YOU WANT TO MAKE ADMIN
-- This script sets the role in the public profile AND the auth metadata

DO $$
DECLARE
    target_email TEXT := 'admin@example.com'; -- <<< CHANGE THIS EMAIL
BEGIN
    -- 1. Update public profile
    UPDATE public.profiles
    SET role = 'admin'
    WHERE email = target_email;

    -- 2. Update auth metadata (for consistency)
    UPDATE auth.users
    SET raw_user_meta_data = 
        CASE 
            WHEN raw_user_meta_data IS NULL THEN jsonb_build_object('role', 'admin')
            ELSE raw_user_meta_data || jsonb_build_object('role', 'admin')
        END
    WHERE email = target_email;

    -- 3. Verify
    IF NOT FOUND THEN
        RAISE NOTICE 'User % not found!', target_email;
    ELSE
        RAISE NOTICE 'Successfully made % an ADMIN', target_email;
    END IF;
END $$;
