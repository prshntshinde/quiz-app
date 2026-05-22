"use client";

import Link from "next/link";

interface EmptyStateProps {
  message?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  message = "No Items Available",
  description = "Check back soon for new content!",
  actionLabel,
  actionHref,
}: Readonly<EmptyStateProps>) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-8xl mb-6 opacity-50" aria-hidden="true">📝</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        {message}
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {description}
      </p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
