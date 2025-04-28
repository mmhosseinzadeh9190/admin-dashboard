import { Trash } from "iconsax-react";
import { User } from "../../services/apiUsers";
import Button from "../../ui/Button";
import CustomUsersSelect from "../../ui/CustomUsersSelect";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../../utils/helpers";

interface AddTeamModalContentTeamMembersProps {
  users: User[];
  handleUserSelect: (member: User) => void;
  teamMembers: User[];
  handleRemoveTeamMember: (member: User) => void;
  disabled: boolean;
}

function AddTeamModalContentTeamMembers({
  users,
  handleUserSelect,
  teamMembers,
  handleRemoveTeamMember,
  disabled,
}: AddTeamModalContentTeamMembersProps) {
  const placeholderAvatar = "/public/avatarPlaceholder.png";

  return (
    <div className="flex flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Members
      </span>

      {teamMembers.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {teamMembers.map((teamMember) => (
            <span
              key={teamMember.id}
              className={`relative flex max-w-80 cursor-default items-center justify-center rounded-full border border-gray-200 bg-gray-100 py-1.5 pl-1.5 ${disabled ? "pr-3" : "pr-11"}`}
            >
              <span className="flex items-center gap-1.5">
                <img
                  src={teamMember.avatar_url || placeholderAvatar}
                  alt=""
                  onError={(e) => addDefaultSrc(e, "avatar")}
                  className="h-6 w-6 rounded-full border border-gray-200 object-cover object-center"
                />

                <span className="truncate text-xs font-medium tracking-0.1 text-gray-800">
                  {capitalizeAllFirstLetters(teamMember.name!)}
                </span>
              </span>

              {!disabled && (
                <Button
                  onClick={() => handleRemoveTeamMember(teamMember)}
                  className="absolute right-0 rounded-full border-l border-gray-200 bg-white p-2.5 text-gray-700 transition-all duration-100 hover:text-error-700 focus:outline-none"
                >
                  <Trash size="16" variant="Linear" />
                </Button>
              )}
            </span>
          ))}
        </div>
      )}

      <CustomUsersSelect
        members={users}
        onUserSelect={handleUserSelect}
        disabled={disabled}
        fullWidth={true}
      />
    </div>
  );
}

export default AddTeamModalContentTeamMembers;
