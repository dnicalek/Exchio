import { object, string, date } from "yup";

export const schema = object({
  taskName: string()
    .min(3, "Task name must be at least 3 characters")
    .max(100, "Task name must be less than 100 characters")
    .required("Task name is required"),
    deadline: date()
    .min(new Date(), "Date cannot be in the past")
    .required("Date is required"),
    notes: string()
    .min(10, "Notes must be at least 10 characters")
    .max(500, "Notes must be less than 500 characters")
    .required("Notes is required"),
    priority: string()
    .oneOf(["high", "medium", "low"], "Importance must be high, medium or low")
    .required("Importance is required"),
}).required();
