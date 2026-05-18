import React, { type ReactNode } from "react";

interface FormSubmitButtonProps {
  isLoading?: boolean;
  value?: string;
  children?: ReactNode;
}

export default function FormSubmitButton({
  isLoading,
  value,
  children,
}: FormSubmitButtonProps) {
  return (
    <button
      type="submit"
      className="p-2 text-white bg-blue-500 w-fit hover:scale-105"
      disabled={isLoading}
    >
      {isLoading && <span>Adding...</span>}
      {!isLoading && children}
      {!isLoading && !children && <span>{value}</span>}
    </button>
  );
}