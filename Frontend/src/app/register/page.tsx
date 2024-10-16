"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import RegisterFormComponent from "@/components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <RegisterFormComponent />
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-2 text-gray-500">O acceder con</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault(); 
            signIn("google", { callbackUrl: "/home" });
          }}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-3 rounded hover:bg-gray-400 flex items-center justify-center"
        >
          <FcGoogle className="mr-3 w-6 h-6" />
          <span>Google</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-sm">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-red-600">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
