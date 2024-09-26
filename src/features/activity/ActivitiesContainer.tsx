import { useSearchParams } from "react-router-dom";
import { Activity } from "../../services/apiActivity";
import { useActivity } from "./useActivity";
import { useProjects } from "../projects/useProjects";
import Spinner from "../../ui/Spinner";
import ActivityGroup from "./ActivityGroup";
import ActivityGroupByType from "./ActivityGroupByType";
import ActivityGroupByProject from "./ActivityGroupByProject";

function ActivitiesContainer() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "due-date";

  const {
    activities,
    isLoading: activitiesIsLoading,
    error: activitiesError,
  } = useActivity();

  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useProjects();

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
