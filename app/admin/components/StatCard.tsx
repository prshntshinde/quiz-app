"use client";

import { type ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const variantStyles = {
  default: {
    bg: "bg-white",
    border: "border-gray-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  success: {
    bg: "bg-white",
    border: "border-green-200",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  warning: {
    bg: "bg-white",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  error: {
    bg: "bg-white",
    border: "border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  info: {
    bg: "bg-white",
    border: "border-purple-200",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
};

export default function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  variant = "default",
}: Readonly<StatCardProps>) {
  const styles = variantStyles[variant];

  return (
    <div className={`p-6 rounded-xl border shadow-sm ${styles.bg} ${styles.border}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  trend.isPositive !== false ? "text-green-600" : "text-red-600"
                }`}
              >
                <svg
                  className={`w-4 h-4 mr-0.5 ${trend.isPositive === false ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500">{trend.label}</span>
            </div>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${styles.iconBg}`}>
            <div className={styles.iconColor}>{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}