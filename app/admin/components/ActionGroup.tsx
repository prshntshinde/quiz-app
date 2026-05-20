"use client";

import { type ReactNode } from "react";

type ActionVariant = "edit" | "delete" | "preview" | "default";

interface Action {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: ActionVariant;
  icon?: ReactNode;
}

interface ActionGroupProps {
  actions: Action[];
  isLoading?: boolean;
  maxVisible?: number;
}

const variantStyles: Record<ActionVariant, string> = {
  edit: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
  delete: "text-red-600 hover:text-red-800 hover:bg-red-50",
  preview: "text-green-600 hover:text-green-800 hover:bg-green-50",
  default: "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
};

const EditIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

function getDefaultIcon(variant: ActionVariant): ReactNode {
  switch (variant) {
    case "edit":
      return <EditIcon />;
    case "delete":
      return <TrashIcon />;
    case "preview":
      return <ExternalLinkIcon />;
    default:
      return null;
  }
}

export default function ActionGroup({
  actions,
  isLoading = false,
  maxVisible = 3,
}: Readonly<ActionGroupProps>) {
  const visibleActions = actions.slice(0, maxVisible);
  const hiddenActions = actions.slice(maxVisible);

  return (
    <div className="flex items-center gap-1">
      {visibleActions.map((action, index) => {
        const variant = action.variant ?? "default";
        const icon = action.icon ?? getDefaultIcon(variant);

        const content = (
          <span className="flex items-center gap-1">
            {icon}
            <span>{action.label}</span>
          </span>
        );

        if (action.href) {
          return (
            <a
              key={`${action.label}-${index}`}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${variantStyles[variant]} ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={`${action.label}-${index}`}
            type="button"
            onClick={action.onClick}
            disabled={isLoading}
            className={`inline-flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${variantStyles[variant]} ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {content}
          </button>
        );
      })}

      {hiddenActions.length > 0 && (
        <div className="relative group">
          <button
            type="button"
            className="inline-flex items-center p-1.5 text-sm font-medium text-gray-500 rounded-md hover:bg-gray-100"
            aria-label="More actions"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
          <div className="absolute right-0 z-10 hidden w-32 py-1 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg group-hover:block">
            {hiddenActions.map((action, index) => {
              const variant = action.variant ?? "default";
              return (
                <button
                  key={`hidden-${action.label}-${index}`}
                  type="button"
                  onClick={action.onClick}
                  disabled={isLoading}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left transition-colors ${variantStyles[variant]} ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}