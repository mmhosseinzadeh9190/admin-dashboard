import { ArrowLeft, Edit, TickSquare, Trash } from "iconsax-react";
import Button from "./Button";

interface PreMadeButtonsProps {
  type: "cancel" | "confirm" | "delete" | "edit";
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  icon?: JSX.Element;
  disabled?: boolean;
  className?: string;
}

function PreMadeButtons({
  type,
  text,
  onClick,
  icon,
  disabled,
  className,
}: PreMadeButtonsProps) {
  if (type === "cancel") {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`${className ? className : ""} group flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 hover:bg-gray-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75`}
      >
        <span className="text-gray-600 group-hover:text-gray-700">
          {icon || <ArrowLeft size="16" variant="Linear" />}
        </span>
        <span className="text-sm font-medium tracking-0.1 text-gray-700 group-hover:text-gray-800">
          {text}
        </span>
      </Button>
    );
  }

  if (type === "confirm") {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`${className ? className : ""} flex items-center justify-center gap-2 rounded-lg border border-success-100 bg-success-50 px-3.5 py-2.5 text-success-700 hover:bg-success-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75`}
      >
        {icon || <TickSquare size="16" variant="Linear" />}
        <span className="text-sm font-medium tracking-0.1">{text}</span>
      </Button>
    );
  }

  if (type === "delete") {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`${className ? className : ""} flex items-center justify-center gap-2 rounded-lg border border-error-100 bg-error-50 px-3.5 py-2.5 text-error-700 hover:bg-error-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75`}
      >
        {icon || <Trash size="16" variant="Linear" />}
        <span className="text-sm font-medium tracking-0.1">{text}</span>
      </Button>
    );
  }

  if (type === "edit") {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        className={`${className ? className : ""} flex items-center justify-center gap-2 rounded-lg border border-primary-100 bg-primary-50 px-3.5 py-2.5 text-primary-800 hover:bg-primary-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75`}
      >
        {icon || <Edit size="16" variant="Linear" />}
        <span className="text-sm font-medium tracking-0.1">{text}</span>
      </Button>
    );
  }
}

export default PreMadeButtons;
