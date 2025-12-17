import { createClient } from '@supabase/supabase-js';


// These environment variables will differ for production
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Authentication will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
