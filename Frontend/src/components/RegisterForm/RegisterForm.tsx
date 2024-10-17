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
    phone: "",
    email: "",
    password: "",
    name: "",
    dni: "",
    confirmPassword:""
  };

  const handleSubmit = async (values: IRegister, { resetForm }: { resetForm: () => void }) => {
    const success = await signUp(values);

    if (success) {
      alert('Usuario creado con éxito!');
      router.push('/home');
    } else {
      alert('Algo salió mal');
    }

    resetForm();
  };

  return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={registerValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <Field type="text" id="phone" name="phone" />
                        <ErrorMessage name="phone" component="div" />
                    </div>
                    <div>
                        <label htmlFor="dni">DNI</label>
                        <Field type="text" id="dni" name="dni" />
                        <ErrorMessage name="dni" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Field type="password" id="confirmPassword" name="confirmPassword" />
                        <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <button type="submit" disabled={!isValid || !dirty}>Submit</button>
                    <p>Do you already have an account? <Link href={'/login'}>Log In</Link></p>
                </Form>
            )}
        </Formik>
    </div>
  );
}
