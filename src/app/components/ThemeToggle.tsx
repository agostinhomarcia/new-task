"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? "Tema Claro" : "Tema Escuro"}
    </button>
  );
}
