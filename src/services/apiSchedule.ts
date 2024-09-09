import supabase from "./supabase";

interface Schedule {
  id: number;
  date: string | null;
  task: string | null;
  assigned_to: number | null;
  completed: boolean | null;
  project_id: number | null;
}

export async function getSchedules(): Promise<{
  data: Schedule[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("schedules").select("*");

  if (error) {
    console.error("Error fetching schedules:", error.message);
    return {
      data: null,
      error: "Failed to fetch schedules. Please try again later.",
    };
  }

  return { data, error: null };
}
