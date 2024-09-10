"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-xl font-bold">
        Home
      </Link>
      <div></div>
    </nav>
  );
}
