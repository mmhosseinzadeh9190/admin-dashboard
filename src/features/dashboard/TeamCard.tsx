import { ReactNode, useState } from "react";
import { Edit, LogoutCurve, Trash } from "iconsax-react";
import CustomDropdown from "../../ui/CustomDropdown";
import { addDefaultSrc, capitalizeAllFirstLetters } from "../../utils/helpers";
import { Team } from "../../services/apiTeams";
import { User } from "../../services/apiUsers";
import { useUser } from "../authentication/useUser";
import LeaveTeamModalContent from "./LeaveTeamModalContent";
import DeleteTeamModalContent from "./DeleteTeamModalContent";
import EditTeamModalContent from "./EditTeamModalContent";
import { Project } from "../../services/apiProjects";
import { Schedule } from "../../services/apiSchedule";
import Modal from "../../ui/Modal";

interface TeamCardProps {
  teams: { data: Team[] | null; error: string | null } | undefined;
  users: { data: User[] | null; error: string | null } | undefined;
  projects: { data: Project[] | null; error: string | null } | undefined;
  schedules: { data: Schedule[] | null; error: string | null } | undefined;
  onTeamUpdated: () => void;
}

function TeamCard({
  teams,
  users,
  projects,
  schedules,
  onTeamUpdated,
}: TeamCardProps) {
  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const placeholderImage = "/public/imagePlaceholder.png";
  const placeholderAvatar = "/public/avatarPlaceholder.png";

  const userTeams =
    teams?.data
      ?.filter((team) => team.members?.includes(String(user?.id)))
      ?.sort(
        (a, b) =>
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
      ) || [];

  return (
    <div className="px-1.5 pb-1.5">
      {userTeams?.length! > 0 && (
        <div className="overflow-x-scroll rounded-3xl">
          <div className="flex h-full w-full gap-3 whitespace-nowrap rounded-3xl">
            {userTeams?.map((team) => {
              const dropdownItems = [];

              if (user?.id === team.leader_id) {
                dropdownItems.push(
                  {
                    icon: <Edit size="16" variant="Linear" />,
                    label: "Edit",
                    onClick: () => {
                      handleOpenModal(
                        <EditTeamModalContent
                          team={team}
                          users={users?.data!}
                          user={user}
                          onClose={handleCloseModal}
                          onTeamEdited={onTeamUpdated}
                        />,
                      );
                    },
                  },
                  {
                    icon: <Trash size="16" variant="Linear" />,
                    label: "Delete",
                    onClick: () =>
                      handleOpenModal(
                        <DeleteTeamModalContent
                          team={team}
                          projects={projects?.data!}
                          onDeleteSuccess={onTeamUpdated}
                          onClose={handleCloseModal}
                        />,
                      ),
                  },
                );
              } else {
                dropdownItems.push({
                  icon: <LogoutCurve size="16" variant="Linear" />,
                  label: "Leave",
                  onClick: () => {
                    handleOpenModal(
                      <LeaveTeamModalContent
                        team={team}
                        user={user!}
                        schedules={schedules?.data!}
                        projects={projects?.data!}
                        onLeaveSuccess={onTeamUpdated}
                        onClose={handleCloseModal}
                      />,
                    );
                  },
                });
              }

              return (
                <div
                  key={team.id}
                  className="flex min-w-96 flex-col gap-5 rounded-2.5xl bg-white p-4 shadow-sm"
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <h3 className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 p-1.5">
                        <img
                          src={team.team_logo || placeholderImage}
                          alt=""
                          onError={(e) => addDefaultSrc(e, "image")}
                          className="h-7 rounded-md object-cover object-center"
                        />
                      </span>

                      <span className="truncate text-sm font-semibold tracking-0.1 text-gray-900">
                        {capitalizeAllFirstLetters(team.name!)}
                      </span>
                    </h3>

                    <CustomDropdown
                      items={dropdownItems.map((item) => ({
                        ...item,
                        onClick: item.onClick,
                      }))}
                    />
                  </div>

                  <div className="flex items-center gap-2.5">
                    {team.members?.slice(0, 7).map((memberId) => {
                      const user = users?.data?.find(
                        (user) => String(user.id) === memberId,
                      );
                      return (
                        <img
                          key={user?.id}
                          src={user?.avatar_url || placeholderAvatar}
                          alt={user?.name!}
                          onError={(e) => addDefaultSrc(e, "avatar")}
                          className="h-8 w-8 rounded-full object-cover object-center"
                        />
                      );
                    })}
                    {team.members && team.members.length > 7 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300">
                        <span className="mr-px mt-px select-none text-xs text-gray-700">
                          +{team.members.length - 7}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default TeamCard;
