'use client'
import React from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { IRegister } from "@/interfaces/interfaces";

export default function Register() {

    const initialValues : IRegister = {
        name: '',
        email: '',
        phone: '',
        dni: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = (values: IRegister, {resetForm}: {resetForm: () => void} ) => {
        console.log(values);
        resetForm();
    }
    
  return (
    <div>
        {/* <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        > */}
    </div>
  )
}
