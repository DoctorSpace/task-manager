import { Task } from "../../types";
import TaskItem from "../TaskItem/TaskItem";

import "./TaskList.css";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onSuccessTask: (taskId: string) => void;
  onUpdateTask: (updatedTask: Task) => void;
}

export const TaskList = ({
  tasks,
  onDeleteTask,
  onSuccessTask,
  onUpdateTask,
}: TaskListProps) => (
  <ul className="tasks-list">
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onDelete={onDeleteTask}
        onSuccess={onSuccessTask}
        onUpdate={onUpdateTask}
      />
    ))}
  </ul>
);
