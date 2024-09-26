import supabase from "./supabase";

export interface Activity {
  id: number;
  user_id: string | null;
  project_id: number | null;
  activity: string | null;
  activity_content: string[] | null;
  timestamp: string | null;
}

export async function getActivities(): Promise<{
  data: Activity[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("activities").select("*");

  if (error) {
    console.error("Error fetching activities:", error.message);
    return {
      data: null,
      error: "Failed to fetch activities. Please try again later.",
    };
  }

  return { data, error: null };
}
