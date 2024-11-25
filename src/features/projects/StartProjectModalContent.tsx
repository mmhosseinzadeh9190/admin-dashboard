import { useState } from "react";
import { Project } from "../../services/apiProjects";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import Button from "../../ui/Button";
import { CloseSquare, TimerStart } from "iconsax-react";
import PreMadeButtons from "../../ui/PreMadeButtons";

interface StartProjectModalContentProops {
  project: Project;
  onProjectUpdated: () => void;
  onClose: () => void;
}

function StartProjectModalContent({
  project,
  onProjectUpdated,
  onClose,
}: StartProjectModalContentProops) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartProject = async () => {
    setIsSubmitting(true);

    const { error } = await supabase
      .from("projects")
      .update({ status: "run" })
      .eq("id", project.id);

    if (error) {
      toast.error("Failed to start project. Please try again.");
    } else {
      toast.success("Project started successfully!");
      onProjectUpdated();
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="flex w-xl flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-roboto text-xl font-medium tracking-0.1 text-gray-900">
          Start Project
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
        Are you sure you want to start this project?
      </p>

      <div className="flex justify-end">
        <div className="flex w-1/2 gap-3">
          <PreMadeButtons
            type="cancel"
            text="Cancel"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full"
          />

          <PreMadeButtons
            type="confirm"
            text="Start"
            onClick={handleStartProject}
            icon={<TimerStart size="16" variant="Linear" />}
            disabled={isSubmitting}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default StartProjectModalContent;
