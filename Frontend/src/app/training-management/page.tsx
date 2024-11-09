import CreateTrainingPlan from '@/components/CreateTrainingPlan/CreateTrainingPlan'
import TrainingPlans from '@/components/TrainingPlans/TrainingPlans'
import React from 'react'

export default function TrainingManagement() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Training <span className="text-red-600">Management</span>
        </h1>
        <CreateTrainingPlan />
        <TrainingPlans />
      </div>
    </div>
  )
}