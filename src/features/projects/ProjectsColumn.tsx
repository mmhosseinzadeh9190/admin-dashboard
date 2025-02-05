import ProjectCard from "./ProjectCard";
import { Add } from "iconsax-react";
import EmptyState from "./EmptyState";
import Button from "../../ui/Button";
import { Project } from "../../services/apiProjects";
import { ReactNode, useState } from "react";
import Modal from "../../ui/Modal";
import AddProjectModalContent from "./AddProjectModalContent";
import { useSearchParams } from "react-router-dom";
import { Team } from "../../services/apiTeams";
import { useUser } from "../authentication/useUser";
interface ProjectsColumnProps {
  status: "done" | "pending" | "run";
  projects: Project[];
  teams: Team[];
}

function ProjectsColumn({ status, projects, teams }: ProjectsColumnProps) {
  const { user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "project-name";

  const handleOpenModal = (content: ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const userTeamsProjectsId =
    teams
      .filter((team) => team.members?.includes(String(user?.id)))
      .flatMap((team) => team.projects_id) || [];

  const userProjects = userTeamsProjectsId.flatMap((id) =>
    projects.filter((project) => project.id === +id!),
  );

  const filteredProjects = userProjects.filter(
    (project) => project.status === status,
  );

  filteredProjects?.sort((a, b) => {
    switch (filterValue) {
      case "due-date":
        return (
          new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime()
        );

      case "project-tasks":
        const remainingTasksA =
          (a.tasks?.length || 0) - (a.tasks_done?.length || 0);
        const remainingTasksB =
          (b.tasks?.length || 0) - (b.tasks_done?.length || 0);
        return remainingTasksA - remainingTasksB;

      case "project-name":
        return (a.name || "").localeCompare(b.name || "");

      default:
        return (a.name || "").localeCompare(b.name || "");
    }
  });

  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 ${filteredProjects?.length === 0 ? "justify-between" : ""}`}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          {status}
        </h2>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {modalContent}
        </Modal>
      </div>
      <div
        className={`px-1.5 ${filteredProjects?.length !== 0 ? "overflow-y-scroll" : ""}`}
      >
        <div className="flex flex-col gap-3">
          {filteredProjects?.length === 0 ? (
            <EmptyState status={status} />
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))
          )}
        </div>
      </div>
      <Button
        className={`flex justify-center border-t border-gray-200 bg-white py-2 text-gray-600 hover:text-gray-700 ${filteredProjects?.length !== 0 ? "mt-auto" : ""}`}
        aria-label="add button"
        onClick={() =>
          handleOpenModal(
            <AddProjectModalContent
              status={status}
              onClose={handleCloseModal}
            />,
          )
        }
      >
        <Add size="32" variant="Linear" />
      </Button>
    </div>
  );
}

export default ProjectsColumn;
