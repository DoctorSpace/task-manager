import { useState } from "react";

import {
  hasPermissionStatus,
  FIELD_TYPES,
  FIELD_DETAILS,
} from "../../controller/controller";
import { Task, TaskType, Fields, TaskStatus } from "../../types";
import { setColor, formatDate } from "../../utils";
import ArrowIcon from "@/assets/arrow.svg?react";
import BinIcon from "@/assets/bin.svg?react";
import PenIcon from "@/assets/pen.svg?react";
import CheckIcon from "@/assets/check.svg?react";
import CrossIcon from "@/assets/cross.svg?react";

import "./TaskItem.css";

interface ITaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onSuccess: (taskId: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskItem = ({ task, onDelete, onSuccess, onUpdate }: ITaskItemProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [onChangeTask, setOnChangeTask] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    responsible: "",
    location: "",
  });

  const handleChangeTask = () => {
    const newTask: Task = {
      id: task.id,
      title: formData.title || task.title,
      description: formData.description || task.description,
      deadline: formData.deadline || task.deadline,
      responsible: formData.responsible || task.responsible,
      location: formData.location || task.location,
      type: task.type,
      status: task.status,
      createdAt: task.createdAt,
    };

    onUpdate(newTask);

    setFormData({
      title: "",
      description: "",
      deadline: "",
      responsible: "",
      location: "",
    });

    setOnChangeTask(false);
  };

  const renderField = (field: Fields): JSX.Element => {
    const { label } = FIELD_DETAILS[field];

    const placeholder =
      task[field as keyof Task] instanceof Date
        ? (task[field as keyof Task] as Date).toISOString()
        : (task[field as keyof Task] as string);

    return (
      <div key={field} className={"task-form__title"}>
        <p>{label}</p>

        <input
          type={"text"}
          value={formData[field] || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }))
          }
          placeholder={placeholder}
        />
      </div>
    );
  };

  return (
    <li className="task">
      <div className="task__wrapper">
        <div className="task__title">
          <div
            className="task__title-status"
            style={{ backgroundColor: setColor(task.status) }}
          />
          <h3>{task.title}</h3>
        </div>

        <div className="task__buttons">
          {onChangeTask ? (
            <button onClick={() => setOnChangeTask(false)}>
              <CrossIcon />
            </button>
          ) : (
            <>
              {hasPermissionStatus(task, "complete:tasks") && (
                <button onClick={() => onSuccess(task.id)}>
                  <CheckIcon />
                </button>
              )}

              {hasPermissionStatus(task, "update:tasks") && (
                <button
                  onClick={() => {
                    setShow(true);
                    setOnChangeTask(true);
                  }}
                >
                  <PenIcon />
                </button>
              )}
              {hasPermissionStatus(task, "delete:tasks") && (
                <button onClick={() => onDelete(task.id)}>
                  <BinIcon />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div
        className={`task__description-toggle${show ? "_open" : ""}`}
        onClick={() => {
          setShow(!show);
          setOnChangeTask(false);
        }}
      >
        <ArrowIcon />
      </div>

      {show && (
        <div className="task__content">
          <div className="task__content-based">
            <p>
              Статус:{" "}
              {task.status === TaskStatus.Completed
                ? "Выполнено"
                : "В процессе"}
            </p>
            <p>Создано: {formatDate(String(task.createdAt))}</p>
          </div>

          <div className="task__content-details">
            {onChangeTask ? (
              <form>
                {FIELD_TYPES[task.type as TaskType].map((field) =>
                  renderField(field as Fields)
                )}

                <button type="button" onClick={handleChangeTask}>
                  Изменить данные
                </button>
              </form>
            ) : (
              <>
                {FIELD_TYPES[task.type].map((field) => {
                  const value = task[field];
                  const { label } = FIELD_DETAILS[field] || {};

                  return (
                    value && (
                      <div key={field}>
                        <p>
                          {`${label}: ${
                            field === "deadline" ? formatDate(value) : value
                          }`}
                        </p>
                      </div>
                    )
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
