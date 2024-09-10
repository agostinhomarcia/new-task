"use client";

import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const apiBaseUrl = "https://back-new-task.vercel.app";

  useEffect(() => {
    fetch(`${apiBaseUrl}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("O título da tarefa não pode estar vazio.");
      return;
    }

    const newTask = {
      title: newTaskTitle,
      dueDate: new Date().toISOString(),
      completed: false,
    };

    fetch(`${apiBaseUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        setNewTaskTitle("");
        setError(null);
      });
  };

  const deleteTask = (id: number) => {
    fetch(`${apiBaseUrl}/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  const toggleComplete = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      fetch(`${apiBaseUrl}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );
        });
    }
  };

  const editTask = (id: number, newTitle: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      fetch(`${apiBaseUrl}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, title: newTitle }),
      })
        .then((res) => res.json())
        .then((updatedTask) => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
          );
        });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container max-w-3xl mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Gerenciamento de Tarefas
      </h1>

      <div className="mb-4 flex flex-col sm:flex-row w-full gap-4">
        <input
          type="text"
          placeholder="Nova tarefa"
          className="flex-1 border p-2 rounded-md text-slate-700"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
          onClick={addTask}
        >
          Adicionar
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4 flex justify-center space-x-4 flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "all"
              ? "bg-blue-600 text-white border border-blue-600"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "completed"
              ? "bg-blue-600 text-white border border-blue-600"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            filter === "pending"
              ? "bg-blue-600 text-white border border-blue-600"
              : "bg-gray-300 text-gray-800"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
      </div>

      <ul className="w-full space-y-4">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={() => toggleComplete(task.id)}
            onDelete={() => deleteTask(task.id)}
            onEdit={(newTitle) => editTask(task.id, newTitle)}
          />
        ))}
      </ul>
    </div>
  );
}
