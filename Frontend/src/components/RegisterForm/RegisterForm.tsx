"use client";
import { UserContext } from "@/context/user";
import { IRegister } from "@/interfaces/interfaces";
import { registerValidationSchema } from "@/utils/registerValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

export default function RegisterFormComponent() {
  const router = useRouter();
  const { signUp } = useContext(UserContext);

  const initialValues: IRegister = {
    name: '',
    email: '',
    phone: '',
    dni: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values: IRegister, { resetForm }: { resetForm: () => void }) => {
    const success = await signUp(values);

    if (success) {
      alert('Usuario creado con éxito!');
      router.push('/home');
    } else {
      alert('Este usuario ya existe!');
    }

    resetForm();
  };

  return (
<<<<<<< HEAD
    <div >
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
        >
            {({isValid, dirty}) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <Field type="text" id="phone" name="phone" />
                        <ErrorMessage name="phone" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="dni">DNI</label>
                        <Field type="text" id="dni" name="dni" />
                        <ErrorMessage name="dni" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div"/>
                    </div>
                    <button type="submit" disabled={!isValid || !dirty}>Submit</button>
                    <p>Do you already have an account? <Link href={'/login'}>Log In</Link></p>
                </Form>
            )}
        </Formik>

    </div>
  )

=======
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div>
            <label htmlFor="name">Nombre</label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="name" component="div" className="text-red-600" />
          </div>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-600" />
          </div>
          <div>
            <label htmlFor="phone">Teléfono</label>
            <Field
              type="text"
              id="phone"
              name="phone"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="phone" component="div" className="text-red-600" />
          </div>
          <div>
            <label htmlFor="dni">DNI</label>
            <Field
              type="text"
              id="dni"
              name="dni"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="dni" component="div" className="text-red-600" />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-600" />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800"
          >
            Registrarse
          </button>
        </Form>
      )}
    </Formik>
  );
>>>>>>> 46f9eb0d05488a3c6c10d7d6eb7b7f98317b2c4e
}
