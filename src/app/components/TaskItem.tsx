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
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editedTitle.trim() !== "") {
      onEdit(editedTitle);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 rounded shadow-md bg-slate-200">
      <div
        className={`flex-1 sm:mr-8 mb-4 sm:mb-0 text-gray-900 text-lg ${
          task.completed ? "line-through" : ""
        }`}
      >
        {isEditing ? (
          <input
            className="w-full border p-2 rounded text-gray-900"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <span>{task.title}</span>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 w-full sm:w-auto">
        <button className="text-blue-900" onClick={onToggleComplete}>
          {task.completed ? "Desmarcar" : "Completar"}
        </button>

        {isEditing ? (
          <button className="text-green-500" onClick={handleSaveEdit}>
            Salvar
          </button>
        ) : (
          <button
            className="text-yellow-900"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}

        <button className="text-red-900" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}
