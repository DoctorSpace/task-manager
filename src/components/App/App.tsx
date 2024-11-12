import { useState } from "react";
import { TaskManager } from "../../model/TaskManager";
import { Task, TaskStatus, TaskType } from "../../types";
import { TaskList } from "../TaskList/TaskList";
import { TaskForm } from "../TaskForm/TaskForm";
import { Filters } from "../Filters/Filters";
import "./App.css";

const taskManager = new TaskManager();

export const App = () => {
  const [showForm, setShowForm] = useState<boolean>(true);

  const [tasks, setTasks] = useState<Task[]>(taskManager.filterTasks());
  const [filterStatus, setFilterStatus] = useState<TaskStatus | undefined>();
  const [filterType, setFilterType] = useState<TaskType | undefined>();

  const handleAddTask = (task: Task) => {
    taskManager.addTask(task);
    setTasks(taskManager.filterTasks(filterStatus, filterType));
  };

  const handleSuccessTask = (taskId: string) => {
    taskManager.onSuccess(taskId);
    setTasks(taskManager.filterTasks(filterStatus, filterType));
  };

  const handleDeleteTask = (taskId: string) => {
    taskManager.deleteTask(taskId);
    setTasks(taskManager.filterTasks(filterStatus, filterType));
  };

  const handleUpdateTask = (updatedTask: Task) => {
    taskManager.updateTask(updatedTask);
    setTasks(taskManager.filterTasks(filterStatus, filterType));
  }

  const handleFilterChange = (status?: TaskStatus, type?: TaskType) => {
    setFilterStatus(status);
    setFilterType(type);
    setTasks(taskManager.filterTasks(status, type));
  };

  return (
    <div className="app">
      <h1 onClick={() => setShowForm(!showForm)}>Task Manager</h1>
      <div className="app__controls">
        {showForm && <TaskForm onAddTask={handleAddTask} />}
        <Filters onFilterChange={handleFilterChange} />
      </div>
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onSuccessTask={handleSuccessTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
};
