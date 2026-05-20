import SideMenu from "../components/SideMenu";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  readonly children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideMenu />
      <div className="relative flex flex-col overflow-x-hidden overflow-y-auto">
        <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Admin | Quiz App",
  description: "This is a Quiz App",
};