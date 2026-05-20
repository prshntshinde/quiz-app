"use client";

import { type ReactNode } from "react";

export type ColumnAlign = "left" | "center" | "right";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  sortable?: boolean;
  align?: ColumnAlign;
  className?: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  loadingRows?: number;
  emptyMessage?: string;
  emptyIcon?: ReactNode;
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  className?: string;
}

const alignStyles: Record<ColumnAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

function SkeletonRow({ columns }: Readonly<{ columns: number }>) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={`skeleton-${i}`} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
      ))}
    </tr>
  );
}

function EmptyState({
  message,
  icon,
  colSpan,
}: Readonly<{
  message: string;
  icon?: ReactNode;
  colSpan: number;
}>) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-3">
          {icon ? (
            <div className="text-gray-300">{icon}</div>
          ) : (
            <svg
              className="w-12 h-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          )}
          <p className="text-gray-500">{message}</p>
        </div>
      </td>
    </tr>
  );
}

export default function DataTable<T>({
  columns,
  data,
  loading = false,
  loadingRows = 5,
  emptyMessage = "No data available",
  emptyIcon,
  keyExtractor,
  onRowClick,
  className = "",
}: Readonly<DataTableProps<T>>) {
  const hasRowClick = !!onRowClick;

  return (
    <div className={`w-full overflow-hidden rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`px-4 py-3 text-xs font-semibold tracking-wide text-left text-gray-600 uppercase ${alignStyles[column.align ?? "left"]} ${column.className ?? ""}`}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: loadingRows }).map((_, index) => (
                <SkeletonRow key={`loading-${index}`} columns={columns.length} />
              ))
            ) : data.length === 0 ? (
              <EmptyState
                message={emptyMessage}
                icon={emptyIcon}
                colSpan={columns.length}
              />
            ) : (
              data.map((item, index) => {
                const rowKey = keyExtractor(item);
                const baseClass = "hover:bg-gray-50";
                const clickableClass = "w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500";
                const rowClass = hasRowClick ? clickableClass : baseClass;

                return (
                  <tr
                    key={rowKey}
                    onClick={hasRowClick ? () => onRowClick(item) : undefined}
                    className={rowClass}
                  >
                    {columns.map((column) => {
                      let cellContent: ReactNode;
                      if (column.render) {
                        cellContent = column.render(item, index);
                      } else {
                        cellContent = (item as unknown as Record<string, ReactNode>)[column.key];
                      }

                      return (
                        <td
                          key={`${rowKey}-${column.key}`}
                          className={`px-4 py-3 text-sm text-gray-700 ${alignStyles[column.align ?? "left"]} ${column.className ?? ""}`}
                        >
                          {cellContent}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}