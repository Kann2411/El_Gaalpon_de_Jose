'use client'
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/context/user";

const ResetPasswordView = () => {
  const {user} = useContext(UserContext)
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
      try {
        const token = localStorage.getItem('token');
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
        } else {
          alert('Error when changing password');
        }
      } catch (error) {
        console.error(error);
        alert('Error when changing password');
      }
    },
  });

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="New Password"
          onChange={formik.handleChange}
          value={formik.values.newPassword}
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div>{formik.errors.newPassword}</div>
        ) : null}

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordView;
