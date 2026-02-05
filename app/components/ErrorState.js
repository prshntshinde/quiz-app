import React from "react";

export default function ErrorState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-fade-in">
            <div className="text-8xl mb-6 opacity-20 dark:opacity-40 select-none">
                ⚠️
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Oops! Something went wrong
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                {message || "We encountered an error while fetching the quizzes. Please try again later."}
            </p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out"
            >
                Refresh Page
            </button>
        </div>
    );
}
