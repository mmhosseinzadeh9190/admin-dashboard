import Spinner from "../../ui/Spinner";
import { useActivity } from "../activity/useActivity";
import { useUser } from "../authentication/useUser";
import { useTeams } from "../dashboard/useTeams";
import { useProjects } from "../projects/useProjects";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";
import ProfileSettings from "./ProfileSettings";
import SocialMedia from "./SocialMedia";
import ThemePreferences from "./ThemePreferences";

type Props = {};

function SettingsItems({}: Props) {
  const {
    user,
    isLoading: userIsLoading,
    error: userError,
    refetch: userRefetch,
  } = useUser();

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

  if (
    userIsLoading ||
    activitiesIsLoading ||
    teamsIsLoading ||
    projectsIsLoading
  )
    return <Spinner />;

  return (
    <div className="flex flex-col gap-4 pb-8">
      <div className="flex gap-4">
        <ProfileSettings user={user} userRefetch={userRefetch} />
        <ChangePassword user={user} userRefetch={userRefetch} />
      </div>
      <ThemePreferences />
      <DeleteAccount
        user={user}
        activities={activities!}
        teams={teams!}
        projects={projects!}
      />
      <SocialMedia />
    </div>
  );
}

export default SettingsItems;
