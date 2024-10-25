"use client";

import { UserContext } from "@/context/user";
import { IRegister } from "@/interfaces/interfaces";
import { registerValidationSchema } from "@/utils/registerValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Swal from 'sweetalert2';

export default function RegisterForm() {
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
        title: 'Success!',
        text: 'You have registered successfully!',
        icon: 'success',
        confirmButtonText: 'Accept',
        customClass: {
          popup: 'bg-[#222222] text-white',
          title: 'text-[#B0E9FF]',
          confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none rounded-md transition-colors duration-300',
        },
        buttonsStyling: false,
      });
      router.push("/home");
    } else {
      Swal.fire({
        title: '¡Ups!',
        text: '¡Este correo electrónico ya existe!',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo',
        customClass: {
          popup: 'bg-[#222222] text-white',
          title: 'text-[#B0E9FF]',
          confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none rounded-md transition-colors duration-300',
        },
        buttonsStyling: false,
      });
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
        <Form className="grid grid-cols-2 gap-x-4 gap-y-6">
          <div className="relative z-0 w-full group">
            <Field
              type="text"
              name="name"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative z-0 w-full group">
            <Field
              type="email"
              name="email"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative z-0 w-full group">
            <Field
              type="password"
              name="password"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative z-0 w-full group">
            <Field
              type="password"
              name="confirmPassword"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div className="relative z-0 w-full group">
            <Field
              type="text"
              name="dni"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="dni"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              DNI
            </label>
            <ErrorMessage name="dni" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          
          <div className="relative z-0 w-full group">
            <Field
              type="text"
              name="phone"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className="col-span-2 w-full bg-red-600 text-[#222222] py-3 rounded-md hover:bg-red-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"  
          >
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
}