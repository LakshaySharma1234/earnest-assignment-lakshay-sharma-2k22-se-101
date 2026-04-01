"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { tasksAPI, type Task } from "@/lib/auth-service";
import EditTaskModal from "./EditTaskModal";

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskItem({
  task,
  onTaskUpdated,
  onTaskDeleted,
}: TaskItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await tasksAPI.toggleTask(task.id);
      toast.success("Task status updated");
      onTaskUpdated();
    } catch (error) {
      toast.error("Failed to update task status");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(true);
    try {
      await tasksAPI.deleteTask(task.id);
      toast.success("Task deleted");
      onTaskDeleted();
    } catch (error) {
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <button
              onClick={handleToggle}
              disabled={isToggling}
              className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 transition ${
                task.status === "completed"
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 hover:border-green-400"
              }`}
            >
              {task.status === "completed" && (
                <span className="text-white text-sm flex items-center justify-center h-full">
                  ✓
                </span>
              )}
            </button>

            <div className="flex-1">
              <h3
                className={`text-lg font-semibold transition ${
                  task.status === "completed"
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition text-sm"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm disabled:bg-gray-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <EditTaskModal
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onTaskUpdated={onTaskUpdated}
      />
    </>
  );
}
