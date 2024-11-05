
  
  /* // BotonPrueba.tsx
'use client';
import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/user';
import { jwtDecode } from "jwt-decode";
import Loading from '@/components/Loading/Loading';
import { fetchUserData } from '@/lib/server/fetchUsers';

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
    const signInWithGoogle = async () => {
      const token = searchParams?.token;

    if (token) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const role = decodedToken.role;
      const userId = decodedToken.id;
      const userEmail = decodedToken.email;


      const userWithRole = {
        id: userId,
        email: userEmail,
        role: role,
        token: token
      };

      const fetchedUserData = await fetchUserData(userId, token)
      if (fetchedUserData ){
        setUser({...userWithRole, ...fetchedUserData})
      }
      localStorage.setItem('user', JSON.stringify(userWithRole));
      localStorage.setItem('token', token);
      setIsLogged(true);
      setLoading(false);

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
    }
    signInWithGoogle()
  }, [searchParams, router, setIsLogged, setUser]);


  if (loading) {
    return <Loading />;
  }

  return <div>Redirecting...</div>; 
}


 */