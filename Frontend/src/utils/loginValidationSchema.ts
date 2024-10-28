import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
    email: 
    Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  
    password: 
    Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, "Password must contain both letters and numbers")
    .required("Password is required"),
})