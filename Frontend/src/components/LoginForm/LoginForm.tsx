'use client'
import React, { useContext } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { ILogin } from '@/interfaces/interfaces'
import { loginValidationSchema } from '@/utils/loginValidationSchema'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/user'

export default function LoginForm() {

    const router = useRouter()
    const {signIn} = useContext(UserContext)

    const initialValues: ILogin = {
        email: '',
        password: ''
    }

    const handleSubmit = async (values: ILogin, {resetForm}: {resetForm: () => void}) => {
        const success = await signIn(values)

        if (success) {
            alert('User logged in successfully!')
            router.push('/home')
        }

        if(!success){
            alert('Email or Password incorrect!')
        }
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
