-- Update site settings to OKIKE
-- Run this in your Supabase SQL Editor

UPDATE public.site_settings 
SET 
    site_name = 'OKIKE',
    contact_email = 'contact@okike.com'
WHERE true;

-- Verify the update
SELECT site_name, contact_email FROM public.site_settings;
