import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { ToastProvider } from "./components/Toast";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz App - Test Your Knowledge & Challenge Your Mind",
  description:
    "Explore diverse quiz topics, get instant feedback, and track your progress. Start your learning journey with our engaging quiz application today.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <NavBar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}