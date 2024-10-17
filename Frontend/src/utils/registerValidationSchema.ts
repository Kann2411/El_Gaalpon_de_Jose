import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
    name: 
    Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
    .required("Name is required"),

    email: 
    Yup.string()
    .email("Invalid email")
    .required("Email is required"),

    phone: 
    Yup.string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must contain only numbers")/* 
    .min(10, "Phone must be at least 10 characters"), */
,
    dni: 
    Yup.string()
    .max(8, "DNI must be at most 8 characters")
    .matches(/^\d+$/, "DNI must contain only numbers")
    .required("DNI is required"),

    password: 
    Yup.string()
    .min(6, "Password must be at least 6 characters")
    /* .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain both letters and numbers") */
    .required("Password is required"),


    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

})