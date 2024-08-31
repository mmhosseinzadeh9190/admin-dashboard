import { Danger } from "iconsax-react";
import { iconColor } from "../../styles/GlobalStyles";

interface EmptyStateProps {
  status: string;
}

function EmptyState({ status }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      <Danger size="18" color={iconColor} variant="Linear" />
      <span className="mt-[3px] select-none text-gray-600">
        No {status} projects found
      </span>
    </div>
  );
}

export default EmptyState;
