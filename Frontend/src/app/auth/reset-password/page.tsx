'use client';
import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/context/user";
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading/Loading';

const ResetPasswordView = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenFromUrl = url.searchParams.get('token');

    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Requerido")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
      confirmPassword: Yup.string()
        .required("Requerido")
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/auth/reset-password?token=${token}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          }),
        });

        if (response.ok) {
          alert('Password successfully changed');
          router.push('/login');
        } else {
          alert('Error when changing password');
        }
      } catch (error) {
        console.error(error);
        alert('Error when changing password');
      } finally {
        setLoading(false);
      }
    },
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={formik.handleSubmit} className="bg-gray-800 p-6 rounded-md shadow-md w-96">
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="New Password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
          className="mb-4 p-2 pl-1 w-full bg-black border-2 border-red-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="text-red-600">{formik.errors.newPassword}</div>
        ) : null}

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="mb-4 p-2 pl-1 w-full bg-black border-2 border-red-600 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600">{formik.errors.confirmPassword}</div>
        ) : null}

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordView;
