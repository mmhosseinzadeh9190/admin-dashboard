import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/apiProjects";
import Spinner from "../../ui/Spinner";
import ProjectsColumn from "./ProjectsColumn";

function ProjectsColumns() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["project"],
    queryFn: getProjects,
  });

  if (isLoading) return <Spinner />;

  const statuses = ["pending", "run", "done"];

  return (
    <div className="container mx-auto h-full">
      <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-3">
        {statuses.map((status) => (
          <ProjectsColumn
            key={status}
            status={status}
            projects={projects?.data!}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsColumns;
