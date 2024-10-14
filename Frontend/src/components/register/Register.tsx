'use client'
import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";

export default function Register() {

    const initialValues = {
        name: '',
        email: '',
        birthdate: '',
        dni: '',
        password: '',
        confirmPassword: '',
    };
    
  return <div>Register</div>;
}
