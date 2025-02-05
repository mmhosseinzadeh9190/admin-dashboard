import { useUser } from "../features/authentication/useUser";
import UserProjects from "../features/dashboard/UserProjects";
import UserTeams from "../features/dashboard/UserTeams";
import { capitalizeAllFirstLetters } from "../utils/helpers";

function Dashboard() {
  const { user } = useUser();

  const name = capitalizeAllFirstLetters(user?.user_metadata.name).split(
    " ",
  )[0];

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
          Hi {name},{" "}
          <span className="font-roboto text-lg font-normal text-gray-600">
            welcome to Hollow dashboard!
          </span>
        </h1>
      </div>

      <div className="flex h-full flex-col gap-4">
        <UserTeams />
        <UserProjects />
      </div>
    </div>
  );
}

export default Dashboard;
