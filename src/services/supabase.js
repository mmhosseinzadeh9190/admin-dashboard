import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublicKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY;
const serviceRoleKey = import.meta.env.VITE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabasePublicKey);
export default supabase;

export const supabaseServiceRole = createClient(supabaseUrl, serviceRoleKey);
