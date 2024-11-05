// BotonPrueba.tsx
'use client';
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/user';
import {jwtDecode} from "jwt-decode";
import Loading from '@/components/Loading/Loading';

interface DecodedToken {
  role: string;
  id: string;
  email: string;
}

interface BotonPruebaProps {
  searchParams: {
    token?: string;
  };
}

export default function BotonPrueba({ searchParams }: BotonPruebaProps) {
  const router = useRouter();
  const { setIsLogged, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams?.token;

    if (token) {
      localStorage.setItem('token', token);
      const decodedToken: DecodedToken = jwtDecode(token);
      const userInfo = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
        token, // Incluye el token en el objeto de usuario
      };

      // Guarda el usuario completo en `localStorage`
      localStorage.setItem('user', JSON.stringify(userInfo));

      // Actualiza el contexto de usuario
      setUser(userInfo);
      setIsLogged(true);
      setLoading(false);

      // Redirige según el rol del usuario
      switch (decodedToken.role) {
        case 'admin':
          router.push('/users-controller');
          break;
        case 'coach':
          router.push('/training-management');
          break;
        case 'user':
          router.push('/home');
          break;
        default:
          router.push('/');
      }
    } else {
      setLoading(false); 
    }
  }, [searchParams, router, setIsLogged, setUser]);

  if (loading) {
    return <Loading />;
  }

  return <div>Redirecting...</div>; 
}
