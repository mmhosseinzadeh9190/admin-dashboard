import { useSearchParams } from "react-router-dom";
import { Activity } from "../../services/apiActivity";
import { useActivity } from "./useActivity";
import { useProjects } from "../projects/useProjects";
import Spinner from "../../ui/Spinner";
import ActivityGroup from "./ActivityGroup";
import ActivityGroupByType from "./ActivityGroupByType";
import ActivityGroupByProject from "./ActivityGroupByProject";
import { useTeams } from "../dashboard/useTeams";
import { useUser } from "../authentication/useUser";
import { useUsers } from "../dashboard/useUsers";
import PageNotFound from "../../pages/PageNotFound";

function ActivitiesContainer() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "due-date";

  const { user, isLoading: userIsLoading, error: userError } = useUser();

  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

  const { teams, isLoading: teamsIsLoading, error: teamsError } = useTeams();

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

  if (
    userIsLoading ||
    usersIsLoading ||
    teamsIsLoading ||
    activitiesIsLoading ||
    projectsIsLoading
  )
    return <Spinner />;

  const userTeamIds =
    teams?.data
      ?.filter((team) => team.members?.includes(String(user?.id)))
      .map((team) => team.id) || [];

  const userProjects =
    projects?.data?.filter((project) => userTeamIds?.includes(project.team!)) ||
    [];

  const userProjectIds = userProjects.map((project) => project.id) || [];

  const userActivities =
    activities?.data?.filter((activity) =>
      userProjectIds?.includes(activity.project_id!),
    ) || [];

  const filterActivitiesByDate = (daysAgo: number): Activity[] => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - daysAgo);

    return userActivities.filter((activity) => {
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
  const olderActivities = userActivities.filter((activity) => {
    const activityDate = new Date(activity.timestamp!);
    return (
      activityDate < new Date(new Date().setDate(new Date().getDate() - 2))
    );
  })!;

  return userActivities.length > 0 ? (
    <div className="grid grid-cols-2 gap-4 pb-8">
      {filterValue === "due-date" && (
        <>
          <ActivityGroup
            title="Today"
            activities={todayActivities}
            projects={userProjects}
            users={users?.data!}
          />
          <ActivityGroup
            title="Yesterday"
            activities={yesterdayActivities}
            projects={userProjects}
            users={users?.data!}
          />
          <ActivityGroup
            title="Few days ago"
            activities={olderActivities}
            projects={userProjects}
            users={users?.data!}
          />
        </>
      )}
      {filterValue === "activity-type" && (
        <ActivityGroupByType
          activities={userActivities}
          projects={userProjects}
          users={users?.data!}
        />
      )}
      {filterValue === "project-name" && (
        <ActivityGroupByProject
          activities={userActivities}
          projects={userProjects}
          users={users?.data!}
        />
      )}
    </div>
  ) : (
    <PageNotFound
      message="At this moment, there are no activities available for you to view.
        Please feel free to return later or browse other pages for more
        interesting content."
    />
  );
}

export default ActivitiesContainer;
