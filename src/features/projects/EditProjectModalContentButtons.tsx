import PreMadeButtons from "../../ui/PreMadeButtons";

interface EditProjectModalContentButtonsProps {
  onClose: () => void;
  isSubmitting: boolean;
  handleSave: () => Promise<void>;
}

function EditProjectModalContentButtons({
  onClose,
  isSubmitting,
  handleSave,
}: EditProjectModalContentButtonsProps) {
  return (
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
        text="Confirm"
        onClick={handleSave}
        disabled={isSubmitting}
        className="w-full"
      />
    </div>
  );
}

export default EditProjectModalContentButtons;
