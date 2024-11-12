export enum TaskStatus {
  InProgress = "inProgress",
  Completed = "completed",
}

export enum TaskType {
  Basic = "basic",
  Deadline = "deadline",
  Responsible = "responsible",
  Location = "location",
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
  completionDate?: Date;
  status: TaskStatus;
  type: TaskType;
  deadline?: string;
  responsible?: string;
  location?: string;
}
