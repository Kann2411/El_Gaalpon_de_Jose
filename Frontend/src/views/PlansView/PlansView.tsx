'use client'
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { getMembresia } from "@/lib/server/fetchMembresias";

// Interface for the plan's features
interface Feature {
  text: string;
  included: boolean;
}

// Interface for the PlanCard component props
interface PlanCardProps {
  title: string;
  price: number;
  features: Feature[];
}

const PlansView: React.FC = () => {
  const [plans, setPlans] = useState<PlanCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMembresia()
      .then((data) => {
      
        const formattedPlans = data.map((plan: any) => ({
          title: plan.plan,
          price: Number(plan.price),
          features: plan.features.map((feature: any) => ({
            text: feature.name.replace(/_/g, " ").toLowerCase(),
            included: feature.value,
          })),
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
      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-8">
        Check out our <span className="text-red-600">plans</span>
      </h2>

      {/* Plans container */}
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-3 
          gap-8 
          w-full 
          px-8 
          max-w-7xl
        "
      >
        {/* Render the plans dynamically */}
        {plans.map((plan, index) => (
          <PlanCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </div>
  );
};

// Component for each plan card
const PlanCard: React.FC<PlanCardProps> = ({ title, price, features }) => (
  <div className="bg-zinc-900 p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[600px] cursor-pointer transition duration-300 hover:scale-105">
    {/* Plan header */}
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="text-5xl font-extrabold mb-2">
        ${price}
        <span className="text-lg font-medium text-gray-400">/Month</span>
      </div>
    </div>

    {/* Features list with icons */}
    <ul className="space-y-4 text-white">
      {features.map((feature: Feature, index: number) => (
        <li key={index} className="flex justify-between items-center">
          <span>{feature.text}</span>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              feature.included ? "bg-red-600" : "bg-gray-600"
            }`}
          >
            {feature.included && <FaCheck className="text-white" />}
          </div>
        </li>
      ))}
    </ul>

    {/* Button to choose the plan */}
    <button className="bg-red-600 text-white py-2 px-6 rounded mt-6 hover:bg-red-700 transition">
      Choose Plan
    </button>
  </div>
);

export default PlansView;
