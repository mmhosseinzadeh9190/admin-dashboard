import { useUser } from "../authentication/useUser";
import { useProject } from "./useProject";
import { useUsers } from "../dashboard/useUsers";
import Spinner from "../../ui/Spinner";
import { useTeams } from "../dashboard/useTeams";
import { useSchedules } from "../schedule/useSchedules";
import { useActivity } from "../activity/useActivity";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectDetailsDescription from "./ProjectDetailsDescription";
import ProjectDetailsAttachments from "./ProjectDetailsAttachments";
import ProjectDetailsTasks from "./ProjectDetailsTasks";
import ProjectDetailsComments from "./ProjectDetailsComments";
import ProjectDetailsTeam from "./ProjectDetailsTeam";
import ProjectDetailsFooterButtons from "./ProjectDetailsFooterButtons";

function ProjectDetails() {
  const { user } = useUser();
  const {
    project,
    isLoading: projectIsLoading,
    error: projectError,
    refetch: projectRefetch,
  } = useProject();
  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();
  const { teams, isLoading: teamsIsLoading, error: teamsError } = useTeams();
  const {
    schedules,
    isLoading: schedulesIsLoading,
    error: schedulesError,
  } = useSchedules();
  const {
    activities,
    isLoading: activitiesIsLoading,
    error: activitiesError,
    refetch: activitiesRefetch,
  } = useActivity();

  if (
    projectIsLoading ||
    usersIsLoading ||
    teamsIsLoading ||
    schedulesIsLoading ||
    activitiesIsLoading
  )
    return <Spinner />;

  return (
    <div className="flex flex-col gap-8">
      <ProjectDetailsHeader project={project?.data!} users={users} />

      <div className="flex flex-col gap-8 rounded-3xl border border-gray-200 bg-white p-8">
        <ProjectDetailsDescription project={project?.data!} />

        <ProjectDetailsTeam
          project={project?.data!}
          teams={teams}
          users={users}
        />

        {project?.data?.attachments?.length! > 0 && (
          <ProjectDetailsAttachments project={project?.data!} user={user!} />
        )}

        <ProjectDetailsTasks
          project={project?.data!}
          schedules={schedules}
          users={users}
        />

        <ProjectDetailsComments
          project={project?.data!}
          activities={activities}
          users={users}
          user={user!}
          onActivitiesUpdated={activitiesRefetch}
          onProjectUpdated={projectRefetch}
        />
      </div>

      <ProjectDetailsFooterButtons project={project?.data!} user={user!} />
    </div>
  );
}

export default ProjectDetails;
