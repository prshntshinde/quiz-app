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
    bg: "bg-white dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  success: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-green-200 dark:border-green-800",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  warning: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-yellow-200 dark:border-yellow-800",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  error: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-red-200 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
  },
  info: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-purple-200 dark:border-purple-800",
    iconBg: "bg-purple-100 dark:bg-purple-900/30",
    iconColor: "text-purple-600 dark:text-purple-400",
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
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  trend.isPositive === false ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
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
              <span className="text-sm text-gray-500 dark:text-gray-400">{trend.label}</span>
            </div>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
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