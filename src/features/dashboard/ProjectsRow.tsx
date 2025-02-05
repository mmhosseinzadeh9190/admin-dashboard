import { Project } from "../../services/apiProjects";
import { Team } from "../../services/apiTeams";
import { useUser } from "../authentication/useUser";
import ProjectCard from "../projects/ProjectCard";

interface ProjectsRowProps {
  projects: Project[];
  teams: Team[];
}

function ProjectsRow({ projects, teams }: ProjectsRowProps) {
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

  return (
    <div className="h-full px-1.5 pb-1.5">
      {userProjects.length > 0 && (
        <div className="h-full max-h-[25.3125rem] overflow-x-scroll rounded-3xl">
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
      )}
    </div>
  );
}

export default ProjectsRow;
