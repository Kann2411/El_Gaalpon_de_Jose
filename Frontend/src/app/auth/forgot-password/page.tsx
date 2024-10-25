"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPasswordView = () => {
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Requerido"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });
        if (!response.ok) {
          throw new Error("Error sending email");
        }

        setEmailSent(true);
      } catch (error) {
        console.error("Error sending email", error);
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100"
         style={{
           backgroundImage: "url('https://i.postimg.cc/7YB37My3/carousel.png')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-full max-w-md bg-black bg-opacity-50 p-8 rounded shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">I forgot my password</h2>
        {emailSent ? (
          <p className="text-center text-white">An email has been sent with instructions to reset your password.</p>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white">Dirección de correo</label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 rounded bg-gray-600 text-white"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-gray-600 text-white py-3 rounded hover:bg-gray-700"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Send reset link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
