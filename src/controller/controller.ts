import {
  Task,
  Status,
  Fields,
  FieldDetails,
  FieldTypes,
  TaskType,
  TaskStatus,
} from "../types";

type StatusRole = keyof typeof STATUS;
type Permission = (typeof STATUS)[StatusRole][number];

export const FIELD_DETAILS: FieldDetails = {
  title: { label: "Заголовок", placeholder: "Заголовок" },
  deadline: { label: "Крайний срок", placeholder: "Крайний срок" },
  responsible: {
    label: "Ответственное лицо",
    placeholder: "Ответственное лицо",
  },
  location: { label: "Место проведения", placeholder: "Локация" },
  description: { label: "Описание", placeholder: "Заполнить описание..." },
};

export const TYPE_DETAILS: Record<TaskType, string> = {
  [TaskType.Basic]: "Базовый",
  [TaskType.Deadline]: "Дедлайн",
  [TaskType.Responsible]: "Ответственное лицо",
  [TaskType.Location]: "Место проведения",
};

export const FIELD_TYPES: FieldTypes = {
  basic: [Fields.Title, Fields.Description],
  deadline: [Fields.Title, Fields.Deadline, Fields.Description],
  responsible: [Fields.Title, Fields.Responsible, Fields.Description],
  location: [Fields.Title, Fields.Location, Fields.Description],
};

export const STATUS_DETAILS: Record<TaskStatus, string> = {
  [TaskStatus.InProgress]: "В работе",
  [TaskStatus.Completed]: "Выполнено",
};

const STATUS: Status = {
  inProgress: ["complete:tasks", "update:tasks", "delete:tasks"],
  completed: ["delete:tasks"],
};

export const hasPermissionStatus = (task: Task, permission: Permission) => {
  return (STATUS[task.status] as readonly Permission[]).includes(permission);
};
