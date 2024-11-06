import CreateClass from '@/components/CreateClass/CreateClass'
import ClassList from '@/components/ClassList/ClassList'
import React from 'react'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'

export default function Classes() {
  return (
    <PrivateRoute userRole='admin'>
    <div>
    <CreateClass/>
    <ClassList/>
    </div>
      </PrivateRoute>
  )
}
