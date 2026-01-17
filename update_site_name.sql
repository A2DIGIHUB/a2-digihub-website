-- Update site settings to Illumi-Labs
-- Run this in your Supabase SQL Editor

UPDATE public.site_settings 
SET 
    site_name = 'Illumi-Labs',
    contact_email = 'contact@illumi-labs.com'
WHERE true;

-- Verify the update
SELECT site_name, contact_email FROM public.site_settings;
