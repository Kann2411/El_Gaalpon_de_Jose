"use client";
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { loginValidationSchema } from '@/utils/loginValidationSchema';
import { useRouter } from 'next/navigation';
import { ILogin } from '@/interfaces/interfaces';
import { useContext } from 'react';
import { UserContext } from '@/context/user';
import  Swal  from 'sweetalert2'

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useContext(UserContext);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: ILogin, { resetForm }: { resetForm: () => void }) => {
    const res = await signIn(values);

    if (res) {
      Swal.fire({
        title: 'Success!',
        text: 'You are logged in!',
        icon: 'success',
        confirmButtonText: 'Accept',
        customClass: {
          popup: 'bg-black text-white', 
          title: 'text-red-600',
          confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 border-none rounded-md',
        },
        buttonsStyling: false, 
      })
      router.push('/home');
    } else {
      Swal.fire({
        title: 'Ups!',
        text: 'Email or password incorrect!',
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
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form>
          <div className="mb-4">
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>
          <div className="mb-4">
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-800"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
