import CustomSelect from "../ui/CustomSelect";
import ProjectsColumns from "../features/projects/ProjectsColumns";

function Projects() {
  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
          Projects
        </h1>

        <CustomSelect
          options={[
            { value: "project-name", label: "Project Name" },
            { value: "project-type", label: "Project Type" },
            { value: "due-date", label: "Due Date" },
          ]}
        />
      </div>

      <div className="h-full">
        <ProjectsColumns />
      </div>
    </div>
  );
}

export default Projects;
