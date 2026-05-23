"use client";

import { cn } from "@/lib/utils";

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-400",
  secondary:
    "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 disabled:bg-gray-400",
  success:
    "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 disabled:bg-green-400",
  warning:
    "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-400 disabled:bg-amber-300",
  danger:
    "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 disabled:bg-red-400",
};

function ActionButton({ label, onClick, variant, disabled = false, icon }: Readonly<ActionButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 active:scale-95",
        variantStyles[variant]
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface ActionButtonsProps {
  showOptions: boolean;
  hasSelectedAnswer: boolean;
  hasSubmitted: boolean;
  onShowOptions: () => void;
  onFiftyFifty: () => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function ActionButtons({
  showOptions,
  hasSelectedAnswer,
  hasSubmitted,
  onShowOptions,
  onFiftyFifty,
  onSubmit,
  onClose,
}: Readonly<ActionButtonsProps>) {
  return (
    <fieldset className="flex flex-wrap items-center justify-center gap-3 mt-4" aria-label="Quiz actions">
      {!showOptions && (
        <ActionButton
          label="Show Options"
          onClick={onShowOptions}
          variant="warning"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          }
        />
      )}

      {showOptions && !hasSubmitted && (
        <>
          <ActionButton
            label="50-50"
            onClick={onFiftyFifty}
            variant="secondary"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <ActionButton
            label="Submit"
            onClick={onSubmit}
            variant="primary"
            disabled={!hasSelectedAnswer}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </>
      )}

      <ActionButton
        label="Close"
        onClick={onClose}
        variant="danger"
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        }
      />
    </fieldset>
  );
}
