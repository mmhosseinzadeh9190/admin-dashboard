import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../services/apiActivity";
import { getProjects } from "../../services/apiProjects";
import Spinner from "../../ui/Spinner";
import ActivityGroup from "./ActivityGroup";
import ActivityGroupByType from "./ActivityGroupByType";
import ActivityGroupByProject from "./ActivityGroupByProject";

interface Activity {
  id: number;
  user_id: number | null;
  project_id: number | null;
  activity: string | null;
  activity_content: string[] | null;
  timestamp: string | null;
}

function ActivitiesContainer() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "due-date";

  const {
    data: activities,
    isLoading: activitiesIsLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ["activity"],
    queryFn: getActivities,
  });

  const {
    data: projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useQuery({
    queryKey: ["project"],
    queryFn: getProjects,
  });

  if (activitiesIsLoading || projectsIsLoading) return <Spinner />;

  const filterActivitiesByDate = (daysAgo: number): Activity[] => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    return activities?.data?.filter((activity) => {
      const activityDate = new Date(activity.timestamp!);
      return (
        activityDate.getFullYear() === targetDate.getFullYear() &&
        activityDate.getMonth() === targetDate.getMonth() &&
        activityDate.getDate() === targetDate.getDate()
      );
    })!;
  };

  const todayActivities = filterActivitiesByDate(0);
  const yesterdayActivities = filterActivitiesByDate(1);
  const olderActivities = activities?.data?.filter((activity) => {
    const activityDate = new Date(activity.timestamp!);
    return (
      activityDate < new Date(new Date().setDate(new Date().getDate() - 2))
    );
  })!;

  return (
    <div className="grid grid-cols-2 gap-4 pb-8">
      {filterValue === "due-date" && (
        <>
          <ActivityGroup title="Today" activities={todayActivities} />
          <ActivityGroup title="Yesterday" activities={yesterdayActivities} />
          <ActivityGroup title="Few days ago" activities={olderActivities} />
        </>
      )}
      {filterValue === "activity-type" && (
        <ActivityGroupByType activities={activities!} />
      )}
      {filterValue === "project-name" && (
        <ActivityGroupByProject activities={activities!} projects={projects!} />
      )}
    </div>
  );
}

export default ActivitiesContainer;
