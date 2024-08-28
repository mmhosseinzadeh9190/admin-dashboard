import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

function Button({
  className,
  onClick,
  ariaLabel,
  type = "button",
  children,
}: ButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
