"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  siblingCount?: number;
}

function getPageNumbers(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "...")[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, "...", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = range(totalPages - (2 + siblingCount * 2), totalPages);
    return [1, "...", ...rightRange];
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, "...", ...middleRange, "...", totalPages];
}

function ChevronIcon({ direction }: Readonly<{ direction: "left" | "right" | "first" | "last" }>) {
  if (direction === "first") {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
      </svg>
    );
  }
  if (direction === "last") {
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
      </svg>
    );
  }
  return direction === "left" ? (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  ) : (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function NavButton({
  page,
  label,
  icon,
  disabled,
  baseUrl,
}: Readonly<{
  page: number;
  label: string;
  icon: React.ReactNode;
  disabled: boolean;
  baseUrl: string;
}>) {
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        aria-label={label}
        tabIndex={-1}
        className="p-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg opacity-50 cursor-not-allowed"
      >
        {icon}
      </button>
    );
  }

  return (
    <Link
      href={`${baseUrl}?page=${page}`}
      aria-label={label}
      className="p-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      {icon}
    </Link>
  );
}

interface PageButtonProps {
  page: number | "...";
  currentPage: number;
  baseUrl: string;
  label: string;
}

function PageButton({ page, currentPage, baseUrl, label }: Readonly<PageButtonProps>) {
  if (page === "...") {
    return (
      <span className="px-3 py-2 text-gray-400 dark:text-gray-500 select-none" aria-hidden="true">
        &hellip;
      </span>
    );
  }

  const isActive = page === currentPage;
  const href = `${baseUrl}?page=${page}`;

  if (isActive) {
    return (
      <span
        aria-current="page"
        className="px-3 py-2 font-semibold text-white bg-blue-600 rounded-lg"
      >
        {page}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      aria-label={label}
    >
      {page}
    </Link>
  );
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  siblingCount = 1,
}: Readonly<PaginationProps>) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPageNumbers(currentPage, totalPages, siblingCount);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 mt-6"
    >
      <NavButton
        page={1}
        label="Go to first page"
        icon={<ChevronIcon direction="first" />}
        disabled={currentPage === 1}
        baseUrl={baseUrl}
      />
      <NavButton
        page={currentPage - 1}
        label="Go to previous page"
        icon={<ChevronIcon direction="left" />}
        disabled={currentPage === 1}
        baseUrl={baseUrl}
      />

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <PageButton
            key={page === "..." ? `dots-${page}-${currentPage}` : page}
            page={page}
            currentPage={currentPage}
            baseUrl={baseUrl}
            label={`Go to page ${page}`}
          />
        ))}
      </div>

      <NavButton
        page={currentPage + 1}
        label="Go to next page"
        icon={<ChevronIcon direction="right" />}
        disabled={currentPage === totalPages}
        baseUrl={baseUrl}
      />
      <NavButton
        page={totalPages}
        label="Go to last page"
        icon={<ChevronIcon direction="last" />}
        disabled={currentPage === totalPages}
        baseUrl={baseUrl}
      />
    </nav>
  );
}