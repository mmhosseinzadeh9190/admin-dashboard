import React from "react";

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

function Button({
  className,
  onClick,
  ariaLabel,
  type = "button",
  disabled,
  children,
}: ButtonProps) {
  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
