"use client";
import { UserContext } from "@/context/user";
import { IRegister } from "@/interfaces/interfaces";
import { registerValidationSchema } from "@/utils/registerValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Swal from 'sweetalert2';

export default function RegisterFormComponent() {
  const router = useRouter();
  const { signUp } = useContext(UserContext);

  const initialValues: IRegister = {
    phone: "",
    email: "",
    password: "",
    name: "",
    dni: "",
    confirmPassword: ""
  };

  const handleSubmit = async (values: IRegister, { resetForm }: { resetForm: () => void }) => {
    console.log("Valores enviados:", values);
    const success = await signUp(values);
    if (success) {
      Swal.fire({
        title: 'Yey!',
        text: 'You are registered!',
        icon: 'success',
        confirmButtonText: 'Accept',
        customClass: {
          popup: 'bg-black text-white', 
          title: 'text-red-600',
          confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md',
        },
        buttonsStyling: false, 
      })
      router.push("/home");
    } else {
      Swal.fire({
        title: 'Ups!',
        text: 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Try Again',
        customClass: {
          popup: 'bg-black text-white', 
          title: 'text-red-600',
          confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md',
        },
        buttonsStyling: false, 
      })
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="grid grid-cols-2 gap-4">
          <div className="mb-4 ">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              id="dni"
              name="dni"
              placeholder="DNI"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="dni" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="col-span-2">
            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800"
            >
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
