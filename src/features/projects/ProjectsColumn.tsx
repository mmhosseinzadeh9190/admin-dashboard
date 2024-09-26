import ProjectCard from "./ProjectCard";
import { Add } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";
import EmptyState from "./EmptyState";
import Button from "../../ui/Button";
import { Project } from "../../services/apiProjects";
interface ProjectsColumnProps {
  status: "done" | "pending" | "run";
  projects: Project[];
}

function ProjectsColumn({ status, projects }: ProjectsColumnProps) {
  const filteredProjects = projects?.filter(
    (project) => project.status === status,
  );

  return (
    <div
      className={`flex flex-col gap-4 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 ${filteredProjects?.length === 0 ? "justify-between" : ""}`}
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <h2 className="font-semibold capitalize tracking-0.1 text-gray-700">
          {status}
        </h2>
        <Button className="select-none">
          <img src="/src/assets/ellipsis.svg" alt="Options" />
        </Button>
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
        className={`flex justify-center border-t border-gray-200 bg-white py-2 ${filteredProjects?.length !== 0 ? "mt-auto" : ""}`}
        aria-label="add button"
      >
        <Add size="32" color={iconColor} variant="Linear" />
      </Button>
    </div>
  );
}

export default ProjectsColumn;
