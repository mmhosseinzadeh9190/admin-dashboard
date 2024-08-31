import supabase from "./supabase";

interface Team {
  id: number;
  name: string | null;
  created_at: string | null;
  leader_id: number | null;
  team_size: number | null;
  members: string[] | null;
  project_id: number | null;
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
