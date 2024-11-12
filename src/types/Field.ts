export enum Fields {
  Title = "title",
  Deadline = "deadline",
  Responsible = "responsible",
  Location = "location",
  Description = "description",
}

interface FieldDetail {
  label: string;
  placeholder: string;
}

export type FieldDetails = Record<FieldDetailsKeys, FieldDetail>;
export type FieldDetailsKeys =
  | "title"
  | "deadline"
  | "responsible"
  | "location"
  | "description";

type FieldTypesKeys = "basic" | "deadline" | "responsible" | "location";
export type FieldTypes = Record<FieldTypesKeys, Fields[]>;
