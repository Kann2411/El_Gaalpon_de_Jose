import CreateTrainingPlan from '@/components/CreateTrainingPlan/CreateTrainingPlan'
import React from 'react'
import TrainingPlansView from '@/views/TrainingPlansView/TrainingPlansView'
import PrivateRoute from '@/components/PrivateRoute/PrivateRoute'

export default function TrainingManagement() {
  return (
    <>
    <PrivateRoute userRole='coach'>
    <CreateTrainingPlan/>
    <TrainingPlansView/>
    </PrivateRoute>
      
    </>
  )
}
