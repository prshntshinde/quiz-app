"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaBookBible, FaHouseChimney } from "react-icons/fa6";
import logo from "../../public/HMC_LOGO.svg";
import { twMerge } from "@/libs/utils";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Home", href: "/", icon: <FaHouseChimney size={20} /> },
    { label: "Quiz", href: "/quiz", icon: <FaBookBible size={20} /> },
    { label: "Admin", href: "/admin", icon: <FaBookBible size={20} /> },
  ];

  return (
    <nav className="flex items-center justify-start px-5 mb-5 space-x-6 font-bold border-b h-14">
      <div>
        <Link href="/">
          <Image
            src={logo}
            // width={50}
            // height={50}
            alt="HMC Logo"
            className="w-12 h-12"
          />
        </Link>
      </div>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            // className={`${
            //   link.href === currentPath ? "text-zinc-950" : "text-zinc-500"
            // } hover:text-zinc-900 transition-colors`}
            className={twMerge("hover:bg-sky-100 hover:text-blue-600", {
              "text-blue-600": link.href === currentPath,
            })}
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
