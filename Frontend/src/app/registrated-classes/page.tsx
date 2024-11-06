import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import RegistratedClassesView from '@/views/RegistratedClassesView/RegistratedClassesView'
import React from 'react'

export default function RegistratedClasses() {
  return (
    <PrivateRoute userRole='coach'>

   <div >
    <RegistratedClassesView/>
   </div>
    </PrivateRoute>
  )
}


