'use client'
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResetPasswordView = () => {
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
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas deben coincidir'), // Eliminar `null`
    }),
    onSubmit: async (values) => {
      try {
        // Aquí harías la solicitud para restablecer la contraseña
        const response = await fetch(`http://localhost:3000/auth/reset-password?token=<Token>`, {
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
          // Aquí manejas la respuesta exitosa
          alert('Contraseña restablecida exitosamente');
        } else {
          // Aquí manejas el error
          alert('Error al restablecer la contraseña');
        }
      } catch (error) {
        console.error(error);
        alert('Error al restablecer la contraseña');
      }
    },
  });

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="Nueva Contraseña"
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
          placeholder="Confirmar Contraseña"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}

        <button type="submit">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordView;
