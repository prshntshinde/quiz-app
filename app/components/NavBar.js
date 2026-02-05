"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logo from "../../public/HMC_LOGO.svg";
import { twMerge } from "@/libs/utils";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Quiz", href: "/quiz" },
    { label: "Admin", href: "/admin" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src={logo}
                alt="HMC Logo"
                className="w-10 h-10 transform group-hover:scale-110 transition-transform duration-300"
              />
            </Link>
          </div>

          <ul className="flex space-x-1 sm:space-x-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={twMerge(
                    "px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300 ease-out transform hover:-translate-y-0.5",
                    {
                      "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300": link.href === currentPath,
                    }
                  )}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
