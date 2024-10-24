'use client'
import AdminDashboardView from '../AdminDashboardView/AdminDashboardView'
import CoachDashboardView from '../CoachDashboardView/CoachDashboardView'
import UserDashboardview from '../UserDashboardView/UserDashboardview'
import React, { useContext } from 'react'
import { UserContext } from '@/context/user'

export default function DashboardView() {
    const {user} = useContext(UserContext)
  if (user?.role === 'admin') {
    return <AdminDashboardView />
  }else if (user?.role === 'coach') {
    return <CoachDashboardView />
  }else if (user?.role === 'user') {
    return <UserDashboardview />
  } else if (!user) {
    return <p>You have to be logged in to access this page</p>
  } 
  
}
