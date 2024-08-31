import supabase from "./supabase";

interface Project {
  id: number;
  name: string | null;
  description: string | null;
  tasks: string[] | null;
  attachments: string[] | null;
  status: string | null;
  deadline: string | null;
  created_by: number | null;
  created_at: string | null;
  updated_at: string | null;
  tags: string[] | null;
  team: number | null;
  tasks_done: string[] | null;
}

export async function getProjects(): Promise<{
  data: Project[] | null;
  error: string | null;
}> {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    console.error("Error fetching projects:", error.message);
    return {
      data: null,
      error: "Failed to fetch projects. Please try again later.",
    };
  }

  return { data, error: null };
}
