"use client";

import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import ThemeToggle from "../components/ThemeToggle";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  useEffect(() => {
    fetch("http://localhost:3001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    const newTask = {
      title: newTaskTitle,
      dueDate: new Date().toISOString(),
      completed: false,
    };
    fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        setNewTaskTitle("");
      });
  };

  const deleteTask = (id: number) => {
    fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    });
  };

  const toggleComplete = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      fetch(`http://localhost:3001/tasks/${id}`, {
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Tarefas</h1>

      <ThemeToggle />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nova tarefa"
          className="border p-2 rounded mr-2"
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

      <ul className="w-full max-w-md">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={() => toggleComplete(task.id)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}
