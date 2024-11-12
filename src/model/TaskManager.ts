import { Task, TaskStatus, TaskType } from "../types";

export class TaskManager {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  addTask(task: Task): void {
    this.tasks.unshift(task);
    this.saveTasks();
  }

  onSuccess(id: string): void {
    const task = this.tasks.find((task) => task.id === id);

    if (task && task.status === TaskStatus.InProgress) {
      task.status = TaskStatus.Completed;
      task.completionDate = new Date();
      this.saveTasks();
    }
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      this.saveTasks();
    }
  }

  filterTasks(status?: TaskStatus, type?: TaskType): Task[] {
    return this.tasks.filter(
      (task) =>
        (!status || task.status === status) && (!type || task.type === type)
    );
  }

  private saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  private loadTasks(): void {
    const tasksJSON = localStorage.getItem("tasks");
    if (tasksJSON) {
      this.tasks = JSON.parse(tasksJSON).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        deadline: task.deadline ? new Date(task.deadline) : undefined,
      }));
    }
  }
}
