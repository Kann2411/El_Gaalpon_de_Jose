'use client';
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/user';
import {jwtDecode} from 'jwt-decode';

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

  useEffect(() => {
    const token = searchParams?.token;

    if (token) {
      try {
        localStorage.setItem('token', token);
        const decodedToken: DecodedToken = jwtDecode(token);
        
        const userInfo = {
          id: decodedToken.id,
          email: decodedToken.email,
          role: decodedToken.role,
          token, 
        };

        
        localStorage.setItem('user', JSON.stringify(userInfo));

        
        setUser(userInfo);
        setIsLogged(true);

        
        const redirectUser = () => {
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
        };

        
        redirectUser();

      } catch (error) {
        console.error("Error al procesar el token:", error);
        
        router.push('/');
      }
    } else {
      console.warn("Token no encontrado en los parámetros de búsqueda");
      router.push('/');
    }
  }, [searchParams, router, setIsLogged, setUser]);

  return <div>Redirecting...</div>;
}
