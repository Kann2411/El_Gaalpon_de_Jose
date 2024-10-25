'use client'
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { getMembresia } from "@/lib/server/fetchMembresias";
import { UserContext } from "@/context/user";


interface ISuscriptionData {
  title: string;
  quantity: number;
  unit_price: string;
  currency_id: string;
}
interface PlanCardProps {
  planId: string;
  plan: string;
  price: string;
  currency: string;
  description: string;
  benefits: string[];
  idealFor: string;
}

const PlansView: React.FC = () => {
  const [plans, setPlans] = useState<PlanCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMembresia()
    .then((data) => {
      const formattedPlans = data.map((plan: any) => ({
        planId: plan.id,
        plan: plan.plan,
        price: plan.price,
        currency: plan.currency || "$",  
        description: plan.description,
        benefits: plan.benefits,
        idealFor: plan.idealFor
      }));
      setPlans(formattedPlans);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching membership data:", err);
      setError("Failed to load plans.");
      setLoading(false);
    });
    
  }, []);

  if (loading) {
    return <div className="text-white">Loading plans...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8">
        Check out our <span className="text-red-600">plans</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 max-w-7xl">
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            planId= {plan.planId}
            plan={plan.plan}
            price={plan.price}
            currency={plan.currency}
            description={plan.description}
            benefits={plan.benefits}
            idealFor={plan.idealFor}
          />
        ))}
      </div>
    </div>
  );
};

const PlanCard: React.FC<PlanCardProps> = ({ plan, price, currency, description, benefits, idealFor, planId }) => {
  const { user } = useContext(UserContext);

  const createPreference = async () => {
    if (!user) {
      alert("You have to be logged in to make a purchase.");

      return;
    }
    if (!user?.id || !plan || !price || !currency || !planId) {
      console.error("Faltan datos para crear la preferencia.");
      return;
    }
  
    const suscripcionData: ISuscriptionData = {
      title: plan,
      quantity: 1,
      currency_id: currency,
      unit_price: price,
    };
  
    try {
      const response = await fetch("http://localhost:3000/mercadopago/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suscripcionData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error("No se recibió una URL de redirección desde Mercado Pago.");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };
  

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
      <h3 className="text-2xl font-bold mb-4">{plan}</h3>
      <p className="text-xl mb-2">
        {currency}
        {price}
      </p>
      <p className="mb-4">{description}</p>
      <ul className="mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center mb-2">
            <FaCheck className="text-green-500 mr-2" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={createPreference}
        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
      >
        Get Plan
      </button>
    </div>
  );
};

export default PlansView;
