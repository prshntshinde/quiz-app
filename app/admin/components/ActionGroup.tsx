"use client";

import Link from "next/link";
import { type ReactNode, useState, useRef, useEffect, useCallback } from "react";

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
  edit: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30",
  delete: "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30",
  preview: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/30",
  default: "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
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
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = "action-overflow-menu";

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEvent = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        close();
        buttonRef.current?.focus();
        return;
      }
      if (e instanceof MouseEvent && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("keydown", handleEvent);
    document.addEventListener("mousedown", handleEvent);
    return () => {
      document.removeEventListener("keydown", handleEvent);
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [isOpen, close]);

  const handleOverflowKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  const handleOverflowClick = () => {
    setIsOpen((prev) => !prev);
  };

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
            <Link
              key={`${action.label}-${index}`}
              href={isLoading ? "#" : action.href}
              aria-disabled={isLoading ? true : undefined}
              tabIndex={isLoading ? -1 : undefined}
              onClick={(e) => {
                if (isLoading) e.preventDefault();
              }}
              className={`inline-flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors ${variantStyles[variant]} ${
                isLoading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {content}
            </Link>
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
        <div className="relative" ref={menuRef}>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleOverflowClick}
            onKeyDown={handleOverflowKeyDown}
            className="inline-flex items-center p-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="More actions"
            aria-expanded={isOpen}
            aria-controls={menuId}
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
          {isOpen && (
            <div
              id={menuId}
              role="menu"
              className="absolute right-0 z-10 w-32 py-1 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            >
              {hiddenActions.map((action, index) => {
                const variant = action.variant ?? "default";
                return (
                  <button
                    key={`hidden-${action.label}-${index}`}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      action.onClick?.();
                      close();
                    }}
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
          )}
        </div>
      )}
    </div>
  );
}