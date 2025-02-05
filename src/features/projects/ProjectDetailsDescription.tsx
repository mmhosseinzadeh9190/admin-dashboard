import { TextalignLeft } from "iconsax-react";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { Project } from "../../services/apiProjects";

interface ProjectDetailsDescriptionProps {
  project: Project;
}

function ProjectDetailsDescription({
  project,
}: ProjectDetailsDescriptionProps) {
  const projectDescription =
    capitalizeFirstLetter(project.description!) ||
    "There is no description for this project!";

  return (
    <div className="flex gap-4">
      <TextalignLeft size="20" className="text-gray-600" />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold tracking-0.1 text-gray-900">
          Description
        </h3>
        <p className="font-roboto text-sm tracking-0.1 text-gray-800">
          {projectDescription}
        </p>
      </div>
    </div>
  );
}

export default ProjectDetailsDescription;
