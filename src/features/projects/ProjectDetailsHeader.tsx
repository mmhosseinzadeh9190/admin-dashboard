import { ArrowLeft } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { User } from "../../services/apiUsers";
import Button from "../../ui/Button";
import {
  capitalizeAllFirstLetters,
  formatISODateToCustomFormat,
} from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface ProjectDetailsHeaderProps {
  project: Project;
  users: { data: User[] | null; error: string | null } | undefined;
}

function ProjectDetailsHeader({ project, users }: ProjectDetailsHeaderProps) {
  const navigate = useNavigate();

  const projectName =
    capitalizeAllFirstLetters(project.name!) || "Unnamed Project";

  const projectLeader = users?.data?.find(
    (user) => String(user.id) === project.created_by,
  )?.name;

  const projectCreatedAt = formatISODateToCustomFormat(project.created_at!);
  const projectUpdatedAt = formatISODateToCustomFormat(project.updated_at!);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
            {projectName}
          </h1>

          <Button
            className="flex items-center gap-1 font-medium tracking-0.1 text-primary-800 hover:text-primary-900 focus:outline-none"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size="16" variant="Linear" />
            Back
          </Button>
        </div>

        <span className="font-roboto text-sm tracking-0.1 text-gray-800">
          Created by{" "}
          <span className="cursor-pointer font-medium text-primary-800 hover:text-primary-900 hover:underline">
            {projectLeader}
          </span>
          , on <span className="text-gray-700">{projectCreatedAt}</span>
        </span>

        <span className="font-roboto text-sm tracking-0.1 text-gray-800">
          Last update at{" "}
          <span className="text-gray-700">{projectUpdatedAt}</span>
        </span>

        {project.tags!.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {project.tags!.map((tag, index) => (
              <span
                key={index}
                className="relative flex max-w-48 cursor-default items-center justify-center truncate rounded-full border border-primary-100 bg-primary-50 px-3 py-2 text-xs font-medium tracking-0.1 text-primary-800"
              >
                {tag.toLowerCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetailsHeader;
