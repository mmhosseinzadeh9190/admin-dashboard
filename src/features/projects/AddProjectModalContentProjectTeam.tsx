import { Team } from "../../services/apiTeams";
import CustomTeamsSelect from "../../ui/CustomTeamsSelect";

interface AddProjectModalContentProjectTeamProps {
  userTeams: Team[] | undefined;
  handleTeamSelect: (member: Team) => void;
  disabled: boolean;
}

function AddProjectModalContentProjectTeam({
  userTeams,
  handleTeamSelect,
  disabled,
}: AddProjectModalContentProjectTeamProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Team
      </span>

      <CustomTeamsSelect
        teams={userTeams}
        onTeamSelect={handleTeamSelect}
        disabled={disabled}
      />
    </div>
  );
}

export default AddProjectModalContentProjectTeam;
