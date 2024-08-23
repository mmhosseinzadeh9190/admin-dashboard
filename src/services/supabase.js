import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://grrbotnrdjqbvjpugvan.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdycmJvdG5yZGpxYnZqcHVndmFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2NDQzOTYsImV4cCI6MjAzOTIyMDM5Nn0.bSaIRHSKEkHiDfo7hgFdcBPR3lJNL1Q0g12OeO7FvdI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
