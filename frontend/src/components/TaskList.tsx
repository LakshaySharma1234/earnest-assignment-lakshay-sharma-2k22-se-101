"use client";

import { Task } from "@/lib/auth-service";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskList({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
}: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </div>
  );
}
