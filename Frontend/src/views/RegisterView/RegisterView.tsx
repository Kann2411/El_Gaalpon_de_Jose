"use client";

import { FcGoogle } from "react-icons/fc";
import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { signIn } from "next-auth/react";
import { useContext } from 'react';
import { UserContext } from '@/context/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function RegisterView() {
  const { signIn: contextSignIn } = useContext(UserContext);
  const router = useRouter();
  const handleGoogleSignUp = async () => {
    try {
      router.push('http://localhost:3000/auth/google')
     } catch (error) {
       console.error('Error inesperado durante el inicio de sesión con Google:', error);
     }
  };

  return (
    <div className="flex w-full h-screen">
      {/* Lado izquierdo - Formulario de registro */}
      <div className="w-1/2 h-full bg-[#222222] flex items-center justify-center">
        <div className="w-full max-w-lg px-8 mb-10">
          <div className="text-center my-5">
            <h2 className="text-3xl font-bold text-white">Sign Up</h2>
          </div>

          <RegisterForm />

          <div className="flex items-center justify-center my-7">
            <hr className="w-full border-gray-600" />
            <span className="px-4 text-gray-400">Or</span>
            <hr className="w-full border-gray-600" />
          </div>

          <button
            onClick={handleGoogleSignUp}
            className="w-full py-4 px-4 bg-white text-black rounded-md hover:bg-gray-200 flex items-center justify-center transition duration-300"
          >
            <FcGoogle className="mr-2 text-2xl" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Lado derecho - Imagen */}
      <div className="w-1/2 h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1520334298038-4182dac472e8?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Imagen de fondo"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}