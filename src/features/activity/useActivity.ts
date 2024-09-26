import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../services/apiActivity";

export function useActivity() {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  return { activities, isLoading, error };
}
