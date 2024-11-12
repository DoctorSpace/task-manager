import { useState } from "react";
import { Task, TaskStatus, TaskType, Fields } from "../../types";
import {
  FIELD_TYPES,
  FIELD_DETAILS,
  TYPE_DETAILS,
} from "../../controller/controller";

import "./TaskForm.css";

interface ITaskFormProps {
  onAddTask: (task: Task) => void;
}

export const TaskForm = ({ onAddTask }: ITaskFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    responsible: "",
    location: "",
  });
  const [type, setType] = useState("basic");

  const renderField = (field: Fields): JSX.Element => {
    const { label, placeholder } = FIELD_DETAILS[field];

    return (
      <div
        key={field}
        className={`task-form${
          field === Fields.Description ? "__description" : "__title"
        }`}
      >
        <p>{label}</p>
        {field === Fields.Description ? (
          <textarea
            value={formData["description"]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ["description"]: e.target.value,
              }))
            }
            placeholder={placeholder}
          />
        ) : (
          <input
            type={"text"}
            value={formData[field] || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, [field]: e.target.value }))
            }
            placeholder={placeholder}
          />
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      type: type as TaskType,
      status: TaskStatus.InProgress,
      createdAt: new Date(),
    };

    onAddTask(newTask);

    setFormData({
      title: "",
      description: "",
      deadline: "",
      responsible: "",
      location: "",
    });
    setType("basic");
  };

  return (
    <div className="task-form">
      <form>
        <h4>Добавление задачи</h4>

        <div className="task-form__select">
          <p>Тип задачи</p>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(TYPE_DETAILS).map(([typeKey, typeLabel]) => (
              <option key={typeKey} value={typeKey}>
                {typeLabel as string}
              </option>
            ))}
          </select>
        </div>

        {FIELD_TYPES[type as TaskType].map((field) =>
          renderField(field as Fields)
        )}

        <button type="button" onClick={handleSubmit} disabled={!formData.title}>
          Добавить задачу
        </button>
      </form>
    </div>
  );
};
