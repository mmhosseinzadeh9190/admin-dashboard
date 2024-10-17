import { ArrowLeft, Edit, TickSquare, TimerStart, Trash } from "iconsax-react";
import { Project } from "../../services/apiProjects";
import { User } from "@supabase/supabase-js";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

interface ProjectDetailsFooterButtonsProps {
  project: Project;
  user: User;
}

function ProjectDetailsFooterButtons({
  project,
  user,
}: ProjectDetailsFooterButtonsProps) {
  const navigate = useNavigate();

  let buttonText;
  let buttonIcon;
  if (project.status === "pending") {
    buttonText = "Start";
    buttonIcon = <TimerStart size="16" variant="Linear" />;
  } else if (project.status === "run") {
    buttonText = "Complete";
    buttonIcon = <TickSquare size="16" variant="Linear" />;
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {user?.id === project.created_by && (
        <>
          {project.status === "pending" || project.status === "run" ? (
            <Button className="flex items-center gap-2 rounded-lg border border-success-100 bg-success-50 px-3.5 py-2.5 text-success-700 hover:bg-success-100">
              {buttonIcon}
              <span className="text-sm font-medium tracking-0.1">
                {buttonText}
              </span>
            </Button>
          ) : null}

          <Button className="flex items-center gap-2 rounded-lg border border-error-100 bg-error-50 px-3.5 py-2.5 text-error-700 hover:bg-error-100">
            <Trash size="16" variant="Linear" />
            <span className="text-sm font-medium tracking-0.1">Delete</span>
          </Button>

          <Button className="flex items-center gap-2 rounded-lg border border-primary-100 bg-primary-50 px-3.5 py-2.5 text-primary-800 hover:bg-primary-100">
            <Edit size="16" variant="Linear" />
            <span className="text-sm font-medium tracking-0.1">Edit</span>
          </Button>
        </>
      )}

      <Button
        className="group flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 hover:bg-gray-100"
        onClick={() => navigate(-1)}
      >
        <span className="text-gray-600 group-hover:text-gray-700">
          <ArrowLeft size="16" variant="Linear" />
        </span>
        <span className="text-sm font-medium tracking-0.1 text-gray-700 group-hover:text-gray-800">
          Back
        </span>
      </Button>
    </div>
  );
}

export default ProjectDetailsFooterButtons;
