import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string | React.ReactNode;
  isActive: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  isActive,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-4 py-2 rounded-md ${
        isActive ? "bg-primary text-white" : "bg-gray-200 text-black"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
