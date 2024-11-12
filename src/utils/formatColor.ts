import { TaskStatus } from "../types";

export const setColor = (status: TaskStatus) => {
  if (status === TaskStatus.InProgress) {
    return "#0f56e4";
  }
  if (status === TaskStatus.Completed) {
    return "#0fe43d";
  }

  return "#646464";
};
