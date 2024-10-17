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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-0.1 text-gray-900">
            {projectName}
          </h1>

          <Button
            className="flex items-center gap-1 font-medium tracking-0.1 text-primary-800 hover:text-primary-900"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size="16" variant="Linear" />
            Back
          </Button>
        </div>

        <span className="font-roboto text-sm tracking-0.1 text-gray-800">
          Created by{" "}
          <span className="cursor-pointer text-primary-800 hover:text-primary-900 hover:underline">
            {projectLeader}
          </span>
          , on <span className="text-gray-700">{projectCreatedAt}</span>
        </span>
      </div>
    </div>
  );
}

export default ProjectDetailsHeader;
