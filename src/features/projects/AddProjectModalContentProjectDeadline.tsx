import CustomDatePicker from "../../ui/CustomDatePicker";

interface AddProjectModalContentProjectDeadlineProps {
  handleDateChange: (date: Date) => void;
  disabled: boolean;
}

function AddProjectModalContentProjectDeadline({
  handleDateChange,
  disabled,
}: AddProjectModalContentProjectDeadlineProps) {
  return (
    <div className="flex w-1/2 flex-col gap-3">
      <span className="cursor-default text-sm font-medium tracking-0.1 text-gray-800">
        Deadline
      </span>

      <div className="react-datepicker-container">
        <CustomDatePicker onDateChange={handleDateChange} disabled={disabled} />
      </div>
    </div>
  );
}

export default AddProjectModalContentProjectDeadline;