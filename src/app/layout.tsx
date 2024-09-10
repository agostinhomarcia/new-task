import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "Aplicação de lista de tarefas com Next.js",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="min-h-screen">
      <body className="flex flex-col justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <Navbar />
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
