"use client";

import React from "react";
import Link from "next/link";
import { FaBookBible, FaHouseChimney } from "react-icons/fa6";
import logo from "../../public/HMC_LOGO.svg";
import Image from "next/image";

const NavBar1 = () => {
  const links = [
    { label: "Home", href: "/", icon: FaHouseChimney },
    { label: "Quiz", href: "/quiz", icon: FaBookBible },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between p-6 bg-teal-300">
      <div className="flex items-center flex-shrink-0 mr-6 text-white">
        <Image
          src={logo}
          // width={50}
          // height={50}
          alt="HMC Logo"
          className="w-8 h-8 mr-2 fill-current "
        />
        <span>Logo</span>
      </div>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.label}
            href={link.href}
            className="flex h-[48px] grow items-left justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.label}</p>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar1;
