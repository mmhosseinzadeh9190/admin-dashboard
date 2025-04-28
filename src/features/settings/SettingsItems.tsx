import Spinner from "../../ui/Spinner";
import { useActivity } from "../activity/useActivity";
import { useUser } from "../authentication/useUser";
import { useTeams } from "../dashboard/useTeams";
import { useUsers } from "../dashboard/useUsers";
import { useProjects } from "../projects/useProjects";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import ProfileSettings from "./ProfileSettings";
import SocialMedia from "./SocialMedia";
import ThemePreferences from "./ThemePreferences";

function SettingsItems() {
  const { user: supabaseUser } = useUser();

  const {
    users,
    isLoading: usersIsLoading,
    error: usersError,
    refetch: usersRefetch,
  } = useUsers();

  const {
    activities,
    isLoading: activitiesIsLoading,
    error: activitiesError,
  } = useActivity();

  const { teams, isLoading: teamsIsLoading, error: teamsError } = useTeams();

  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
  } = useProjects();

  const user = users?.data?.find(
    (user) => String(user.id) === supabaseUser?.id!,
  );

  if (
    usersIsLoading ||
    activitiesIsLoading ||
    teamsIsLoading ||
    projectsIsLoading
  )
    return <Spinner />;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex gap-4">
        <ProfileSettings user={user!} usersRefetch={usersRefetch} />
        <ChangePassword user={user!} usersRefetch={usersRefetch} />
      </div>
      <ThemePreferences />
      <DeleteAccount
        supabaseUser={supabaseUser}
        user={user!}
        activities={activities!}
        teams={teams!}
        projects={projects!}
      />
      <SocialMedia />
    </div>
  );
}

export default SettingsItems;
