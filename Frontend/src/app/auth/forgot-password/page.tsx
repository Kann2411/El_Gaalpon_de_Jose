"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const ForgotPasswordView = () => {
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        });
        if (!response.ok) throw new Error("Error sending email");

        setEmailSent(true);
        Swal.fire({
          title: "Success!",
          text: "An email has been sent with instructions to reset your password.",
          icon: "success",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Oops!",
          text: "There was an error sending the email. Please try again.",
          icon: "error",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton: "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      }
    },
  });

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('https://i.postimg.cc/7YB37My3/carousel.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="w-full max-w-md bg-black bg-opacity-50 p-8 rounded shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Forgot Password</h2>
        {emailSent ? (
          <p className="text-center text-white">
            An email has been sent with instructions to reset your password.
          </p>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email Address
              </label>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-[#FFFFFF] py-3 rounded-md hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
