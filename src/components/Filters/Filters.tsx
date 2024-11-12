import { TaskStatus, TaskType } from "../../types";
import { TYPE_DETAILS, STATUS_DETAILS } from "../../controller/controller";
import "./Filters.css";

interface IFiltersProps {
  onFilterChange: (status?: TaskStatus, type?: TaskType) => void;
}

export const Filters = ({ onFilterChange }: IFiltersProps) => (
  <div className="filters">
    <h4>Фильтрация</h4>

    <div className="filters__options">
      <p>Статус</p>
      <select onChange={(e) => onFilterChange(e.target.value as TaskStatus)}>
        <option value="">Все</option>
        {Object.entries(STATUS_DETAILS).map(([statusKey, statusLabel]) => (
          <option key={statusKey} value={statusKey}>
            {statusLabel as string}
          </option>
        ))}
      </select>
    </div>

    <div className="filters__options">
      <p>Тип</p>
      <select
        onChange={(e) => onFilterChange(undefined, e.target.value as TaskType)}
      >
        <option value="">Все</option>
        {Object.entries(TYPE_DETAILS).map(([typeKey, typeLabel]) => (
          <option key={typeKey} value={typeKey}>
            {typeLabel as string}
          </option>
        ))}
      </select>
    </div>
  </div>
);
