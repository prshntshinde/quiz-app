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
    <nav className="flex items-center justify-start px-5 mb-5 space-x-6 font-bold border-b h-14">
      <div>
        <Link href="/">
          <Image
            src={logo}
            alt="HMC Logo"
            className="w-12 h-12"
          />
        </Link>
      </div>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={twMerge(
              "hover:bg-sky-100 hover:text-blue-600 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:duration-300",
              {
                "text-blue-600": link.href === currentPath,
              }
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
