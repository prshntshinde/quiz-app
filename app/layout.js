import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import PropTypes from "prop-types";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz App - Test Your Knowledge & Challenge Your Mind",
  description: "Explore diverse quiz topics, get instant feedback, and track your progress. Start your learning journey with our engaging quiz application today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
