"use client";

import { Field, Form, Formik, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/utils/loginValidationSchema";
import { useRouter } from "next/navigation";
import { ILogin } from "@/interfaces/interfaces";
import { useContext, useState } from "react";
import { UserContext } from "@/context/user";
import Swal from "sweetalert2";

export default function LoginForm() {
  const router = useRouter();
  const { signIn, user } = useContext(UserContext);
  const [focusedField, setFocusedField] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: ILogin,
    { resetForm }: { resetForm: () => void }
  ) => {
    const res = await signIn(values);

    if (res) {
      Swal.fire({
        title: "Success!",
        text: "You are logged in!",
        icon: "success",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
      if(user?.role === 'admin') {
        router.push("/users");
      } else if (user?.role === 'coach') {
        router.push("/training-management");
      } else if (user?.role === 'user') {
        router.push("/home");
      } 
     
    } else {
      Swal.fire({
        title: "Ups!",
        text: "Email or password incorrect!",
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
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => (
        <Form className="grid grid-cols-1 gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <Field
              type="email"
              name="email"
              placeholder=" "
              className="block py-2.5 pl-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <Field
              type="password"
              name="password"
              placeholder=" "
              className="block py-2.5 pl-1 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#B0E9FF] peer"
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-[#f5f5f5] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#ffffff] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className="w-full bg-red-600 text-[#FFFFFF] py-3 rounded-md hover:bg-red-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sign In
          </button>
        </Form>
      )}
    </Formik>
  );
}
