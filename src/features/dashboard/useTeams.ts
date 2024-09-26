import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../../services/apiTeams";

export function useTeams() {
  const {
    data: teams,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  return { teams, isLoading, error };
}
