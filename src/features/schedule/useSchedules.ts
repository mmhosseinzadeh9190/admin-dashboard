import { useQuery } from "@tanstack/react-query";
import { getSchedules } from "../../services/apiSchedule";

export function useSchedules() {
  const {
    data: schedules,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });

  return { schedules, isLoading, error, refetch };
}
