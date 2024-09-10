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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Tarefas</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nova tarefa"
          className="border p-2 rounded mr-2 text-slate-700"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Adicionar
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <button
          className={`mr-2 ${filter === "all" ? "font-bold" : ""}`}
          onClick={() => setFilter("all")}
        >
          Todas
        </button>
        <button
          className={`mr-2 ${filter === "completed" ? "font-bold" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </button>
        <button
          className={`${filter === "pending" ? "font-bold" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </button>
      </div>

      <ul>
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
