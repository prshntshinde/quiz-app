"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Quiz", href: "/admin/quiz" },
  { label: "Questions", href: "/admin/questions" },
];

export default function SideMenu() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <section id="sidebar">
      <aside className="relative flex flex-col gap-1 justify-between text-center bg-white border-e min-w-[240px] h-[calc(100vh-2rem)] w-full max-w-[20rem]">
        <ul className="px-4 mt-3 space-y-1">
          {links.map((link) => (
            <li
              key={link.href}
              className="block px-4 py-2 font-bold border rounded-lg text-black-600 text-md hover:bg-sky-100 hover:text-blue-600 border-slate-300"
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div className="px-4 mb-3">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 font-bold text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      </aside>
    </section>
  );
}