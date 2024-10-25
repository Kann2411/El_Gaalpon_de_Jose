"use client";
import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@/context/user";
import Swal from "sweetalert2";

const ResetPasswordView = () => {
  const { user } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/auth/reset-password?token=${token}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            }),
          }
        );

        if (response.ok) {
          Swal.fire({
            title: "Success!",
            text: "Password successfully changed.",
            icon: "success",
            customClass: {
              popup: "bg-[#222222] text-white",
              title: "text-[#B0E9FF]",
              confirmButton:
                "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
            },
            buttonsStyling: false,
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There was an error changing the password.",
            icon: "error",
            customClass: {
              popup: "bg-[#222222] text-white",
              title: "text-[#B0E9FF]",
              confirmButton:
                "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
            },
            buttonsStyling: false,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "There was an error changing the password.",
          icon: "error",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton:
              "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      }
    },
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100"
    style={{
      backgroundImage: "url('https://i.postimg.cc/7YB37My3/carousel.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="w-full max-w-md bg-black bg-opacity-50 p-8 rounded shadow-lg relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Change Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder=" "
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-[#FFFFFF] py-3 rounded-md hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordView;
