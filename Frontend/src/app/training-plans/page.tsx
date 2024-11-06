import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'
import TrainingPlansView from '@/views/TrainingPlansView/TrainingPlansView'
import React from 'react'

export default function TrainingPlansRoute() {
  return (
    <PrivateRoute userRole='user'>

      <TrainingPlansView/>
    </PrivateRoute>
  )
}
