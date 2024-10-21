import React from "react";
import { FaCheck } from "react-icons/fa6";

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
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
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
        {/* Basic Plan */}
        <PlanCard
          title="Basic Plan"
          price={49}
          features={[
            { text: "Unlimited gym access", included: true },
            { text: "24/7 gym access", included: false },
            { text: "Basic group classes", included: true },
            { text: "Advanced group classes", included: false },
            { text: "Access to locker rooms and showers", included: true },
            { text: "One basic training plan", included: false },
            { text: "Access to cardio zones", included: true },
          ]}
        />

        {/* Premium Plan */}
        <PlanCard
          title="Premium Plan"
          price={55}
          features={[
            { text: "Unlimited gym access", included: true },
            { text: "24/7 gym access", included: true },
            { text: "Basic group classes", included: true },
            { text: "Advanced group classes", included: true },
            { text: "Access to locker rooms and showers", included: true },
            { text: "One personalized training plan", included: true },
            { text: "Access to cardio and strength zones", included: true },
          ]}
        />

        {/* VIP Plan */}
        <PlanCard
          title="VIP Plan"
          price={75}
          features={[
            { text: "Unlimited gym access", included: true },
            { text: "24/7 gym access", included: true },
            { text: "Private training sessions (2/month)", included: true },
            { text: "Access to all group classes", included: true },
            { text: "Exclusive locker room area", included: true },
            { text: "Unlimited personalized training plans", included: true },
            { text: "Access to spa and wellness services", included: true },
            { text: "Free supplements (1/month)", included: true },
          ]}
        />
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
