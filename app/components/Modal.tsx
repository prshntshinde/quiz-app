"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
}

export default function Modal({ children, isVisible, onClose, title = "Modal dialog" }: ModalProps) {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isOpen = isVisible && mounted;
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isVisible && mounted) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      requestAnimationFrame(() => {
        modalRef.current?.focus();
      });
    } else if (!isVisible) {
      document.body.style.overflow = "";

      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, mounted]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (document.activeElement === modalRef.current) {
          e.preventDefault();
          if (e.shiftKey) {
            lastElement.focus();
          } else {
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible || !mounted) return null;

  return createPortal(
    <dialog
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl transform animate-scale-in border border-white/20 focus:outline-none"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 rounded-t-3xl"></div>

        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-red-500 dark:hover:bg-red-500 text-gray-500 dark:text-gray-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[85vh] overflow-y-auto custom-scrollbar px-6 pb-6">
          {children}
        </div>
      </div>
    </dialog>,
    document.body
  );
}
