import { ReactNode, useState } from "react";
import CustomDropdown from "../../ui/CustomDropdown";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { useProjects } from "../projects/useProjects";
import ProjectsRow from "./ProjectsRow";
import { useTeams } from "./useTeams";
import { AddSquare } from "iconsax-react";
import AddProjectModalContent from "../projects/AddProjectModalContent";

interface UserProjectsProps {}

function UserProjects({}: UserProjectsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const {
    projects,
    isLoading: projectsIsLoading,
    error: projectsError,
    refetch: projectRefetch,
  } = useProjects();

  const {
    teams,
    isLoading: teamsIsLoading,
    error: teamsError,
    refetch: teamsRefetch,
  } = useTeams();

  if (projectsIsLoading || teamsIsLoading) return <Spinner />;

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
      label: "Add project",
      onClick: () =>
        handleOpenModal(
          <AddProjectModalContent
            status="pending"
            onClose={handleCloseModal}
          />,
        ),
    },
  ];

  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-gray-200 bg-gray-100">
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          Projects
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

      <ProjectsRow projects={projects?.data!} teams={teams?.data!} />
    </div>
  );
}

export default UserProjects;
