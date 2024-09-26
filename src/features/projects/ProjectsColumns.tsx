import Spinner from "../../ui/Spinner";
import ProjectsColumn from "./ProjectsColumn";
import { useProjects } from "./useProjects";

function ProjectsColumns() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <Spinner />;

  const statuses: Array<"pending" | "run" | "done"> = [
    "pending",
    "run",
    "done",
  ];

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
