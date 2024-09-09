"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo à Lista de Tarefas</h1>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded"
        onClick={() => router.push("/tasks")}
      >
        Cadastrar Tarefas
      </button>
    </div>
  );
}
