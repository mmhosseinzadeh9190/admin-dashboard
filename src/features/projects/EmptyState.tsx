import { Danger } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";

interface EmptyStateProps {
  status: "done" | "pending" | "run";
}

function EmptyState({ status }: EmptyStateProps) {
  let message;

  switch (status) {
    case "pending":
      message = "No pending projects found";
      break;
    case "run":
      message = "No running projects found";
      break;
    case "done":
      message = "No completed projects found";
      break;
    default:
      message = "No projects found";
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <Danger size="18" color={iconColor} variant="Linear" />
      <span className="mt-[3px] select-none text-gray-600">{message}</span>
    </div>
  );
}

export default EmptyState;
