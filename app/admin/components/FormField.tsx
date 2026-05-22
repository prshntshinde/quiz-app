"use client";

import { type ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
  className = "",
}: Readonly<FormFieldProps>) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 dark:text-red-400 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1" role="alert">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, className = "", ...props }: Readonly<InputProps>) {
  return (
    <input
      className={`w-full p-2.5 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
        error
          ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
      } ${className}`}
      aria-invalid={error}
      {...props}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ error, className = "", ...props }: Readonly<TextareaProps>) {
  return (
    <textarea
      className={`w-full p-2.5 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 resize-y bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${
        error
          ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
      } ${className}`}
      aria-invalid={error}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ error, className = "", ...props }: Readonly<SelectProps>) {
  return (
    <select
      className={`w-full p-2.5 text-sm border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
        error
          ? "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-200"
          : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-200"
      } ${className}`}
      aria-invalid={error}
      {...props}
    />
  );
}