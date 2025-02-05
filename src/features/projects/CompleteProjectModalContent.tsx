import { useState } from "react";
import { Project } from "../../services/apiProjects";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { CloseSquare } from "iconsax-react";
import PreMadeButtons from "../../ui/PreMadeButtons";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface CompleteProjectModalContentProps {
  project: Project;
  onProjectUpdated: () => void;
  onClose: () => void;
}

function CompleteProjectModalContent({
  project,
  onProjectUpdated,
  onClose,
}: CompleteProjectModalContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const unfinishedTasks = project.tasks?.filter(
    (task) => !project.tasks_done?.includes(task),
  );

  const notAllowed = completedTasks.length !== unfinishedTasks?.length;

  const handleCheckboxChange = (task: string) => {
    setCompletedTasks((prev) => {
      if (prev.includes(task)) {
        return prev.filter((t) => t !== task);
      } else {
        return [...prev, task];
      }
    });
  };

  const handleCompleteProject = async () => {
    setIsSubmitting(true);

    const updatedProject = {
      ...project,
      tasks_done: [...project.tasks_done!, ...completedTasks],
      status: "done",
    };

    const { error } = await supabase
      .from("projects")
      .update(updatedProject)
      .eq("id", project.id);

    if (error) {
      toast.error("Failed to complete project. Please try again.");
    } else {
      toast.success("Project completed successfully!");
      onProjectUpdated();
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="flex w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Complete Project
        </h2>

        <Button
          onClick={onClose}
          disabled={isSubmitting}
          className="text-gray-600 hover:text-gray-700 disabled:cursor-not-allowed"
        >
          <CloseSquare size="20" variant="Linear" />
        </Button>
      </div>

      <p className="font-roboto tracking-0.1 text-gray-800">
        Are you sure you want to complete this project?
      </p>

      {unfinishedTasks?.length! > 0 && (
        <div className="flex flex-col gap-2.5">
          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            In this project, there {unfinishedTasks?.length! > 1 ? "are" : "is"}{" "}
            still {unfinishedTasks?.length} unfinished{" "}
            {unfinishedTasks?.length! > 1 ? "tasks" : "task"}.
          </p>

          {unfinishedTasks?.map((task, index) => {
            return (
              <div key={index} className="flex items-center gap-2">
                <input
                  id={`complete-modal-task-checkbox-${index}`}
                  type="checkbox"
                  aria-label="checkbox"
                  disabled={isSubmitting}
                  onChange={() => handleCheckboxChange(task)}
                  className="h-3 w-3 accent-success-600 focus:outline-none disabled:cursor-not-allowed"
                />
                <div className="flex w-full items-center gap-2.5 overflow-hidden">
                  <label
                    htmlFor={`complete-modal-task-checkbox-${index}`}
                    className="truncate font-roboto text-sm tracking-0.1 text-gray-800"
                  >
                    {capitalizeFirstLetter(task)}
                  </label>
                </div>
              </div>
            );
          })}

          <p className="font-roboto text-sm font-medium tracking-0.1 text-gray-800">
            Please complete the above{" "}
            {unfinishedTasks?.length! > 1 ? "tasks" : "task"} to be able to
            complete the project.
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <div className="flex w-2/3 gap-3">
          <PreMadeButtons
            type="cancel"
            text="Cancel"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full"
          />

          <PreMadeButtons
            type="confirm"
            text="Complete"
            onClick={handleCompleteProject}
            disabled={notAllowed || isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default CompleteProjectModalContent;
