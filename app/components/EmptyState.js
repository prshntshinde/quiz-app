"use client";
import React from "react";

export default function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            {/* Icon */}
            <div className="text-8xl mb-6 opacity-50">📝</div>

            {/* Message */}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Quizzes Available Yet
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
                Check back soon for new quizzes to challenge yourself!
            </p>
        </div>
    );
}
