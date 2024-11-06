'use client'
import { UserContext } from '@/context/user';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

interface IPrivateRouteProps {
  children: React.ReactNode
  userRole: string
}
export default function PrivateRoute({ children, userRole }: IPrivateRouteProps) {
    const token = localStorage.getItem("token");
  const {user } = useContext(UserContext)
  const router = useRouter()
  useEffect(() => {
    if (!token || user?.role !== `${userRole}`) {
      router.push('/')
    }
  }, [user])
  if (!user) {
    return <p>Loading...</p>;
  }

  return children;
}
