'use client'
import { IRegister } from '@/interfaces/interfaces'
import { registerValidationSchema } from '@/utils/registerValidationSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'

export default function RegisterForm() {
  const initialValues: IRegister = {
      name: '',
      email: '',
      phone: '',
      dni: '',
      password: '',
      confirmPassword: '',
  }

  const handleSubmit = async (values: IRegister, { resetForm }: { resetForm: () => void }) => {
    try {
        console.log(values);
        resetForm();
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
    }
}

  return (
    <div>
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
                </Form>
            )}
        </Formik>

    </div>
  )

}
