"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

Modal.propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default function Modal(props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleEscape = (e) => {
      if (e.key === "Escape") props.onClose();
    };

    if (props.isVisible) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      setMounted(false);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [props.isVisible, props.onClose]);

  if (!props.isVisible || !mounted) return null;

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      props.onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
      onClick={props.onClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Close modal backdrop"
    >
      <div
        className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform animate-scale-in overflow-hidden border border-white/20 cursor-default"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"></div>

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-red-500 dark:hover:bg-red-500 text-gray-500 dark:text-gray-400 hover:text-white rounded-full transition-all duration-200 z-10"
          onClick={props.onClose}
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
          {props.children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
