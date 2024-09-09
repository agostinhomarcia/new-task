"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Aplicar ou remover a classe 'dark' no HTML quando o estado mudar
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
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
