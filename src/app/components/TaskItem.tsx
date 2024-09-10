"use client";

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
  return (
    <li className="flex justify-between items-center p-6 rounded shadow-md">
      <div
        className={`flex-1 mr-8 ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title}
      </div>
      <div className="flex space-x-6">
        <button className="text-blue-500" onClick={onToggleComplete}>
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button className="text-yellow-500" onClick={() => onEdit(task.title)}>
          Editar
        </button>
        <button className="text-red-500" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}
