"use client";

import { FcGoogle } from "react-icons/fc";
import LoginForm from "@/components/LoginForm/LoginForm";
import { signIn } from "next-auth/react";
import { useContext } from 'react';
import logo from "@/public/images/image-login.png";
import { UserContext } from '@/context/user';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { fitZoneApi } from "@/api/rutaApi";

export default function LoginView() {
  const { signIn: contextSignIn } = useContext(UserContext);
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
     
     router.push(`${fitZoneApi}/auth/google`)
    } catch (error) {
      console.error('Error inesperado durante el inicio de sesión con Google:', error);
    }
  };

  return (
    <div className="flex w-full h-screen -mt-4">
      <div className="w-1/2 h-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1550259979-ed79b48d2a30?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background Image"
        />
      </div>
      <div className="w-1/2 h-full bg-[#222222] flex items-center justify-center">
        <div className="w-full max-w-lg mb-10">
          <div className="text-center my-5">
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
          </div>

          <LoginForm />

          <div className="flex items-center justify-center">
            <hr className="w-full border-gray-600 my-7" />
            <span className="px-4 text-gray-400">Or</span>
            <hr className="w-full border-gray-600" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full py-4 px-4 bg-white text-black rounded-md hover:bg-gray-200 flex items-center justify-center transition duration-300"
          >
            <FcGoogle className="mr-2 text-2xl" />
            <span>Sign in with Google</span>
          </button>

          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline">
              Sign up
            </Link>
          </p>
          <p className="text-center">
            <Link className="text-red-500" href="/auth/forgot-password">I forgot my password</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 