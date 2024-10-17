import { Profile2User } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { Team } from "../../services/apiTeams";
import { User } from "../../services/apiUsers";
import { iconColor } from "../../styles/GlobalStyles";
import { addDefaultSrc } from "../../utils/helpers";

interface ProjectDetailsTeamProps {
  project: Project;
  teams: { data: Team[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
}

function ProjectDetailsTeam({
  project,
  teams,
  users,
}: ProjectDetailsTeamProps) {
  const teamMembers = teams?.data?.find(
    (team) => team.id === project.team,
  )?.members;

  const placeholderAvatar = "/public/avatarPlaceholder.png";

  return (
    <div className="flex gap-4">
      <div>
        <Profile2User size="20" color={iconColor} variant="Linear" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold tracking-0.1 text-gray-900">
          Team Members
        </h3>
        <span className="flex items-center gap-3">
          {teamMembers?.slice(0, 8).map((memberId) => {
            const user = users?.data?.find(
              (user) => String(user.id) === memberId,
            );
            return (
              <img
                key={user?.id}
                src={user?.avatar_url || placeholderAvatar}
                alt=""
                onError={(e) => addDefaultSrc(e, "avatar")}
                className="h-9 w-9 rounded-full object-cover object-center"
              />
            );
          })}
          {teamMembers && teamMembers.length > 8 && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300">
              <span className="mr-px mt-px select-none text-xs text-gray-700">
                +{teamMembers.length - 8}
              </span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
}

export default ProjectDetailsTeam;
