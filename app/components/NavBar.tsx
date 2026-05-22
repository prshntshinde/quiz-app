"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";

import logo from "@/public/HMC_LOGO.svg";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Quiz", href: "/quiz" },
  { label: "Admin", href: "/admin" },
];

export default function NavBar() {
  const currentPath = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Go to homepage" className="flex items-center gap-2 group">
              <Image
                src={logo}
                alt="HMC Logo"
                width={40}
                height={40}
                priority
                className="w-10 h-10 transform group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <ul className="flex space-x-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 ease-out transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
                      {
                        "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300":
                          link.href === currentPath,
                      }
                    )}
                    href={link.href}
                    aria-current={link.href === currentPath ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <DarkModeToggle />
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <DarkModeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 dark:border-gray-700 py-2 animate-fade-in">
            <ul className="space-y-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    className={cn(
                      "block px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                      {
                        "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300":
                          link.href === currentPath,
                      }
                    )}
                    href={link.href}
                    aria-current={link.href === currentPath ? "page" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
