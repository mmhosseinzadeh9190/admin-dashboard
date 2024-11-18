import { Project } from "../../services/apiProjects";
import PreMadeButtons from "../../ui/PreMadeButtons";

interface DeleteProjectModalContentProps {
  project: Project;
}
function DeleteProjectModalContent({
  project,
}: DeleteProjectModalContentProps) {
  return (
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
          type="delete"
          text="Delete"
          onClick={handleDelete}
          disabled={isSubmitting}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default DeleteProjectModalContent;
