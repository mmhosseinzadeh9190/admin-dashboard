import { RowHorizontal, RowVertical } from "iconsax-react";
import Button from "./Button";
import { iconColor } from "../styles/GlobalStyles";

interface LayoutSortButtonProps {
  activeButton: "horizontal" | "vertical";
  onButtonChange: (button: "horizontal" | "vertical") => void;
}

function LayoutSortButton({
  activeButton,
  onButtonChange,
}: LayoutSortButtonProps) {
  const handleButtonClick = (button: "horizontal" | "vertical") => {
    onButtonChange(button);
  };

  return (
    <div className="overflow-hidden rounded-[10px] bg-white shadow-sm">
      <Button
        className={`p-2.5 ${activeButton === "horizontal" ? "bg-gray-200" : ""}`}
        onClick={() => handleButtonClick("horizontal")}
      >
        <RowHorizontal size="16" color={iconColor} variant="Bulk" />
      </Button>

      <Button
        className={`p-2.5 ${activeButton === "vertical" ? "bg-gray-200" : ""}`}
        onClick={() => handleButtonClick("vertical")}
      >
        <RowVertical size="16" color={iconColor} variant="Bulk" />
      </Button>
    </div>
  );
}

export default LayoutSortButton;
