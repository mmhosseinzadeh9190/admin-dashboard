import supabase from "./supabase";

export interface User {
  id: number;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  user_roles: string[] | null;
  is_online: boolean | null;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export async function getUsers(): Promise<{
  data: User[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error.message);
    return {
      data: null,
      error: "Failed to fetch users. Please try again later.",
    };
  }

  return { data, error: null };
}
