import "ldrs/lineSpinner";

interface SpinnerProps {
  size?: string;
  stroke?: string;
  speed?: string;
  color?: string;
}

function Spinner({
  size = "40",
  stroke = "3",
  speed = "0.5",
  color = "#6A0DAD",
}: SpinnerProps) {
  return (
    <div className="flex h-full items-center justify-center">
      <l-line-spinner
        size={size}
        stroke={stroke}
        speed={speed}
        color={color}
      ></l-line-spinner>
    </div>
  );
}

export default Spinner;
