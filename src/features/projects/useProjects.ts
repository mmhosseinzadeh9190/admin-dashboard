import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/apiProjects";

export function useProjects() {
  const {
    data: projects,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return { projects, isLoading, error, refetch };
}
