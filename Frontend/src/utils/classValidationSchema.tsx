// validationSchemas.js
import * as Yup from "yup";

export const classValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  intensity: Yup.string().oneOf(["low", "medium", "high"], "Invalid intensity").required("Intensity is required"),
  capacity: Yup.number()
    .min(1, "Minimum capacity is 1")
    .max(20, "Maximum capacity is 20")
    .required("Capacity is required"),
  status: Yup.string().oneOf(["Active", "Inactive"], "Invalid status").required("Status is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("Duration is required"),
  day: Yup.string().required("Day is required"),
  starttime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
    .required("Start time is required"),
  endtime: Yup.string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format")
    .required("End time is required"),
  coach: Yup.string().required("Coach is required"),
});
