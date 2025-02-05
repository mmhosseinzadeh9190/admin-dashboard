import { ReactNode, useState } from "react";
import CustomDropdown from "../../ui/CustomDropdown";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useProjects } from "../projects/useProjects";
import { useSchedules } from "../schedule/useSchedules";
import TeamCard from "./TeamCard";
import { useTeams } from "./useTeams";
import { useUsers } from "./useUsers";
import { AddSquare } from "iconsax-react";
import AddTeamModalContent from "./AddTeamModalContent";
import { useUser } from "../authentication/useUser";

function UserTeams() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const { user } = useUser();

  const {
    teams,
    isLoading: teamsIsLoading,
    error: teamsError,
    refetch: teamsRefetch,
  } = useTeams();

  const { users, isLoading: usersIsLoading, error: usersError } = useUsers();

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
    teamsIsLoading ||
    usersIsLoading ||
    projectsIsLoading ||
    schedulesIsLoading
  )
    return <Spinner />;

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const dropdownItems = [
    {
      icon: <AddSquare size="16" variant="Linear" />,
      label: "Add team",
      onClick: () =>
        handleOpenModal(
          <AddTeamModalContent
            user={user!}
            users={users?.data!}
            onClose={handleCloseModal}
            onTeamAdded={teamsRefetch}
          />,
        ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Teams
        </h2>

        <CustomDropdown
          items={dropdownItems.map((item) => ({
            ...item,
            onClick: item.onClick,
          }))}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      </div>

      <TeamCard
        teams={teams}
        users={users}
        projects={projects}
        schedules={schedules}
        onTeamUpdated={teamsRefetch}
      />
    </div>
  );
}

export default UserTeams;
