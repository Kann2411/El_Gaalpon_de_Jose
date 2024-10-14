'use client'
import React from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { ILogin } from '@/interfaces/interfaces'
import { loginValidationSchema } from '@/utils/loginValidationSchema'

export default function LoginForm() {

    const initialValues: ILogin = {
        email: '',
        password: ''
    }

    const handleSubmit = (values: ILogin, {resetForm}: {resetForm: () => void}) => {
        console.log(values)
        resetForm()
    }

  return (
    <div>
        <Formik 
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
        >
            {({isValid, dirty}) => (
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <button type="submit" disabled={!isValid || !dirty}>Submit</button>
                </Form>
            )}
        </Formik>
    </div>
  )
}
