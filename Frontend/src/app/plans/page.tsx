import React from "react";
import PlansView from "@/views/PlansView/PlansView";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const Plans = () => {
  return (
<>
<PrivateRoute userRole='user'>
<PlansView />
</PrivateRoute>
</>
  );
};

export default Plans;
