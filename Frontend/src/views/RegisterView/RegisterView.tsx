"use client";
import { FcGoogle } from "react-icons/fc";
import RegisterFormComponent from "@/components/RegisterForm/RegisterForm";

const RegisterView = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/T3PmQycr/photo-1517836357463-d25dfeac3438.jpg')",
          filter: "brightness(0.5)", // This makes the background darker
        }}
      ></div>

      {/* Overlay for the darkened effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form content */}
      <div className="relative w-full max-w-md bg-black bg-opacity-50 p-8 rounded shadow-lg z-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Registro</h2>
        <RegisterFormComponent />
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-2 text-gray-300">O acceder con</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "http://localhost:3000/auth/google";
          }}
          className="w-full mt-4 bg-gray-600 text-white py-3 rounded hover:bg-gray-700 flex items-center justify-center"
        >
          <FcGoogle className="mr-3 w-6 h-6" />
          <span>Google</span>
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-red-500">Inicia sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
