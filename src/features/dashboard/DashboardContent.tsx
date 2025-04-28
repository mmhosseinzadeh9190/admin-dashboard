import Spinner from "../../ui/Spinner";
import { capitalizeAllFirstLetters } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useProjects } from "../projects/useProjects";
import { useSchedules } from "../schedule/useSchedules";
import UserProjects from "./UserProjects";
import UserTeams from "./UserTeams";
import { useTeams } from "./useTeams";
import { useUsers } from "./useUsers";

function DashboardContent() {
  const { user: supabaseUser } = useUser();

  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

  const {
    teams,
    isLoading: teamsIsLoading,
    error: teamsError,
    refetch: teamsRefetch,
  } = useTeams();

  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useProjects();

  const {
    schedules,
    isLoading: schedulesIsLoading,
    error: schedulesError,
  } = useSchedules();

  if (
    usersIsLoading ||
    teamsIsLoading ||
    projectsIsLoading ||
    schedulesIsLoading
  )
    return <Spinner />;

  const user = users?.data?.find(
    (user) => String(user.id) === supabaseUser?.id!,
  );

  const name = capitalizeAllFirstLetters(user?.name!).split(" ")[0];

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
        Hi {name},{" "}
        <span className="font-roboto text-lg font-normal text-gray-600">
          welcome to Hollow dashboard!
        </span>
      </h1>

      <div className="flex h-full flex-col gap-4">
        <UserTeams
          user={supabaseUser!}
          users={users!}
          teams={teams!}
          projects={projects!}
          schedules={schedules!}
          teamsRefetch={teamsRefetch}
        />
        <UserProjects projects={projects!} teams={teams!} />
      </div>
    </>
  );
}

export default DashboardContent;
