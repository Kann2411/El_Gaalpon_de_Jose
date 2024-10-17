"use client";
import { UserContext } from "@/context/user";
import { IRegister } from "@/interfaces/interfaces";
import { postSignUp } from "@/lib/server/fetchUsers";
import { registerValidationSchema } from "@/utils/registerValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

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
    console.log('Registro exitoso:', success);
    if (success) {
      alert('Usuario creado con éxito!');
      router.push('/home');
    } else {
      alert('Algo salió mal');
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
        <Form>
          <div className="mb-4">
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Nombre"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="text"
              id="phone"
              name="phone"
              placeholder="Teléfono"
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
              placeholder="Contraseña"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800"
          >
            Registrarse
          </button>
          <p className="text-center mt-4 text-sm">
            ¿Ya tienes una cuenta? <Link href="/login" className="text-red-600">Inicia sesión</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
