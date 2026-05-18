"use client";

import { useState } from "react";
import Modal from "@/app/components/Modal";

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
              {[
                { icon: "🏆", text: "प्रश्नमंजुषा तीन फेऱ्यांमध्ये घेतली जाईल." },
                { icon: "🚫📱", text: "मोबाईल फोन आणी बायबल वापरण्यास सक्त्त मनाई आहे." },
                { icon: "⏱️", text: "पहिली आणि दुसरी फेरी ४५ सेकंदाची असेल." },
                { icon: "🔢", text: "प्रत्येक प्रश्नाला १० गुण असतील." },
                { icon: "👥", text: "गट चर्चेला परवानगी आहे." },
                { icon: "🗣️", text: "प्रश्नांची उत्तरे फक्त गट नेत्याकडून दिली जातील." },
                { icon: "🤫", text: "इतर टीम सदस्यांना प्रॉम्ट करण्यास सक्त्त मनाई आहे." },
                { icon: "🛑", text: "उत्तर चुकीचे असल्यास ते पुढील गटात पाठवले जाणार नाही." },
                { icon: "🆘", text: "दोन लाइफलाइन (५०-५० आणि डबल) एकदाच वापरता येतील." },
                { icon: "🪑", text: "सहभागींना त्यांची जागा सोडण्याची परवानगी नाही." },
                { icon: "🏁", text: "पहिले ३ गट अंतिम फेरीसाठी निवडले जातील." },
                { icon: "⚡", text: "तिसरी फेरी ३० सेकंदाची आणि नेगेटिव्ह मार्किंगची असेल." },
                { icon: "⚖️", text: "श्रोते आणि सहभागींनी गांभीर्य आणि पावित्र्य राखले पाहिजे." },
                { icon: "✅", text: "शेवटचा निर्णय आयोजकांचा असेल." },
              ].map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200 border border-transparent hover:border-purple-200 dark:hover:border-purple-700"
                >
                  <span className="text-xl shrink-0">{rule.icon}</span>
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