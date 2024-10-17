"use client"

import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IUserResponse } from '@/interfaces/interfaces'

const Admin = () => {

    const router = useRouter()
    const [userData, setUserData] = useState<IUserResponse>()
    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const userData = JSON.parse(localStorage.getItem("userSession")!)
            setUserData(userData)
            if (!userData?.token!) router.push("/")
        }
    },[userData])
  return (
    <div>page</div>
  )
}

export default Admin