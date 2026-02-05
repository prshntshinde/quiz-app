import React from "react";

export default function QuizSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      {/* Header Skeleton */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center animate-pulse">
          <div className="h-12 sm:h-16 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-lg w-1/2 mx-auto"></div>
        </div>
      </section>

      {/* Quiz Cards Skeleton */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                {/* Title Skeleton */}
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4 mb-4"></div>

                {/* Description Skeleton */}
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-4/6"></div>
                </div>

                {/* Buttons Skeleton */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <div className="h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex-1"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg flex-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <span className="sr-only">Loading quizzes...</span>
    </div>
  );
}
