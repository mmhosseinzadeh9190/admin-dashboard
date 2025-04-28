import { Add } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { Team } from "../../services/apiTeams";
import Button from "../../ui/Button";
import { useUser } from "../authentication/useUser";
import ProjectCard from "../projects/ProjectCard";
import AddProjectModalContent from "../projects/AddProjectModalContent";
import { ReactNode, useState } from "react";
import Modal from "../../ui/Modal";

interface ProjectsRowProps {
  projects: Project[];
  teams: Team[];
}

function ProjectsRow({ projects, teams }: ProjectsRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const { user } = useUser();

  const userTeamsProjectsId =
    teams
      .filter((team) => team.members?.includes(String(user?.id)))
      .sort(
        (a, b) =>
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime(),
      )
      .flatMap((team) => team.projects_id) || [];

  const userProjects = userTeamsProjectsId.flatMap((id) =>
    projects.filter(
      (project) => project.id === +id! && project.status !== "done",
    ),
  );

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="h-full px-1.5 pb-1.5">
      {userProjects.length > 0 ? (
        <div className="h-full max-h-[25.3125rem] min-h-32 overflow-x-scroll rounded-3xl">
          <div className="flex h-full w-full gap-3 whitespace-nowrap rounded-3xl">
            {userProjects.map((project) => (
              <ProjectCard
                project={project}
                key={project.id}
                fullHeight={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <Button
          onClick={() =>
            handleOpenModal(
              <AddProjectModalContent
                status="pending"
                onClose={handleCloseModal}
              />,
            )
          }
          className="group flex h-full max-h-[25.3125rem] min-h-32 min-w-96 items-center justify-center rounded-2.5xl border-2 border-dashed border-gray-300 shadow-sm hover:border-gray-400"
        >
          <span className="flex items-center gap-1 font-roboto text-lg font-medium tracking-0.1 text-gray-600 group-hover:text-gray-700">
            <Add size="28" />
            Add Project
          </span>
        </Button>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </Modal>
    </div>
  );
}

export default ProjectsRow;
