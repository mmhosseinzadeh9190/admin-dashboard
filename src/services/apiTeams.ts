import supabase from "./supabase";

export interface Team {
  id: number;
  name: string | null;
  created_at: string | null;
  leader_id: string | null;
  team_size: number | null;
  members: string[] | null;
  projects_id: string[] | null;
  team_logo: string | null;
}

export async function getTeams(): Promise<{
  data: Team[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("teams").select("*");

  if (error) {
    console.error("Error fetching teams:", error.message);
    return {
      data: null,
      error: "Failed to fetch teams. Please try again later.",
    };
  }

  return { data, error: null };
}
