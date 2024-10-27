'use client';
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/user';
import { jwtDecode } from "jwt-decode";

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
      localStorage.setItem('token', token);

      const decodedToken: DecodedToken = jwtDecode(token);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role,
      });
      setIsLogged(true);
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
          router.push('/'); 
      }
    }
  }, [searchParams, router, setIsLogged, setUser]);

  return <div>Loading...</div>;
}
