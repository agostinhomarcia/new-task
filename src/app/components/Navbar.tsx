"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-bold">
        Home
      </Link>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
