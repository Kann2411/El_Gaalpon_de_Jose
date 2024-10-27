'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
}

interface BotonPruebaProps {
  searchParams: {
    token?: string;
  };
}

export default function BotonPrueba({ searchParams }: BotonPruebaProps) {
  const router = useRouter();

  useEffect(() => {
    const token = searchParams?.token;

    if (token) {
      // Almacena el token en localStorage
      localStorage.setItem('token', token);

      // Decodifica el token para obtener el rol del usuario
      const decodedToken: DecodedToken = jwtDecode(token);

      // Redirige según el rol
      switch (decodedToken.role) {
        case 'admin':
          router.push('/users');
          break;
        case 'coach':
          router.push('/training-management');
          break;
        case 'user':
          router.push('/home');
          break;
        default:
          router.push('/'); // Redirige a una ruta de inicio si el rol no coincide
      }
    }
  }, [searchParams, router]);

  return <div>Loading...</div>;
}
