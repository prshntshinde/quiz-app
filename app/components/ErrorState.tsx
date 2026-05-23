"use client";

interface ErrorStateProps {
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "Something went wrong",
  retryLabel = "Try Again",
  onRetry,
}: Readonly<ErrorStateProps>) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="text-8xl mb-6 opacity-50" aria-hidden="true">⚠️</div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Oops!
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          aria-label={retryLabel}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {retryLabel}
        </button>
      )}
    </div>
  );
}
