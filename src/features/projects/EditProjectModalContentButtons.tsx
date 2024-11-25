import PreMadeButtons from "../../ui/PreMadeButtons";

interface EditProjectModalContentButtonsProps {
  onClose: () => void;
  disabled: boolean;
  notChanged: boolean;
  handleSave: () => Promise<void>;
}

function EditProjectModalContentButtons({
  onClose,
  disabled,
  notChanged,
  handleSave,
}: EditProjectModalContentButtonsProps) {
  return (
    <div className="flex w-1/2 gap-3">
      <PreMadeButtons
        type="cancel"
        text="Cancel"
        onClick={onClose}
        disabled={disabled}
        className="w-full"
      />

      <PreMadeButtons
        type="confirm"
        text="Confirm"
        onClick={handleSave}
        disabled={notChanged || disabled}
        className="w-full"
      />
    </div>
  );
}

export default EditProjectModalContentButtons;
