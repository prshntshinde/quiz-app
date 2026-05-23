"use client";
import React from "react";
import Link from "next/link";
import RulesModal from "./RulesModal";

interface Quiz {
  _id: string;
  title: string;
  description?: string;
}

interface QuizCardProps {
  quiz: Quiz;
}

export default function QuizCard({ quiz }: Readonly<QuizCardProps>) {
  return (
    <article
      className="group relative animate-fade-in bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden"
      aria-label={`Quiz: ${quiz.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300" aria-hidden="true" />
      <div className="relative space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {quiz.title}
        </h2>
        {quiz.description && (
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {quiz.description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <RulesModal />
          <Link
            href={`/quiz/${quiz._id}`}
            className="group/start relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/start:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true" />
            <span className="relative flex items-center gap-2">
              <span>Start Quiz</span>
              <svg
                className="w-5 h-5 transform group-hover/start:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
    </article>
  );
}
