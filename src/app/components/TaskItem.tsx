"use client";

interface TaskProps {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
  onToggleComplete: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: TaskProps) {
  return (
    <li
      className={`p-2 border-b flex justify-between items-center ${
        task.completed ? "line-through" : ""
      }`}
    >
      <span>{task.title}</span>
      <div>
        <button className="text-blue-500 mr-4" onClick={onToggleComplete}>
          {task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button className="text-red-500" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}
