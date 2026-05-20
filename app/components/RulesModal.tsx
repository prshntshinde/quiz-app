"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";
import { RULES } from "@/lib/constants";

export default function RulesModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-purple-700 dark:text-purple-300 bg-white dark:bg-gray-800 border-2 border-purple-600 dark:border-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/30 transform hover:scale-105 transition-all duration-300 ease-out shadow-md hover:shadow-lg"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Rules
      </button>
      <div>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              प्रश्नमंजुषाचे नियम
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
                >
                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-snug">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}