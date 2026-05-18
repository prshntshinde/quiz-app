"use client";

import React, { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function Modal({ children, isVisible, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!isVisible || !mounted) return null;

  return createPortal(
    <dialog
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onCancel={() => onClose()}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform animate-scale-in overflow-hidden border border-white/20"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"></div>
        <button
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 hover:bg-red-500 dark:hover:bg-red-500 text-gray-500 dark:text-gray-400 hover:text-white rounded-full transition-all duration-200 z-10"
          onClick={onClose}
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
        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </dialog>,
    document.body
  );
}