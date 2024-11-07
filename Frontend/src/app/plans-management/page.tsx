import React from 'react'
import CreatePlans from '@/components/CreatePlans/CreatePlans'
import PlansList from '@/components/PlansList/PlansList'

const PlansManagement = () => {
  return (
    <div>
      <CreatePlans />
      <PlansList />
    </div>
  )
}

export default PlansManagement