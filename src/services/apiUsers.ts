import supabase from "./supabase";

interface User {
  id: number;
  username: string | null;
  email: string | null;
  password: string | null;
  profile_picture: string | null;
  is_online: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  roles: string[] | null;
  last_login: string | null;
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
