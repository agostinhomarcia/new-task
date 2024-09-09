"use client";

import { useState } from "react";

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggleComplete: () => void;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEdit = () => {
    if (isEditing && newTitle.trim() !== "") {
      onEdit(newTitle); // Enviar o novo título para a função de edição
    }
    setIsEditing(!isEditing); // Alternar entre os modos de edição e visualização
  };

  return (
    <li
      className={`p-2 border-b flex justify-between items-center ${
        task.completed ? "line-through" : ""
      }`}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-1 mr-2 rounded text-slate-700"
        />
      ) : (
        <span>{task.title}</span>
      )}

      <div>
        <button className="text-blue-500 mr-4" onClick={onToggleComplete}>
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button className="text-yellow-500 mr-4" onClick={handleEdit}>
          {isEditing ? "Salvar" : "Editar"}
        </button>
        <button className="text-red-500" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}
