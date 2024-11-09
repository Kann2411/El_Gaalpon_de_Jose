"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { getMembresia } from "@/lib/server/fetchMembresias";
import { UserContext } from "@/context/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { fitZoneApi } from "@/api/rutaApi";

interface ISuscriptionData {
  title: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  userId: string;
  token: string | null;
}

interface PlanCardProps {
  planId: string;
  plan: string;
  price: string;
  currency: string;
  description: string;
  benefits: string[];
  userId: string;
  idealFor: string;
}

const PlansView: React.FC = () => {
  const { user } = useContext(UserContext);
  const [plans, setPlans] = useState<PlanCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPaymentStatus = () => {
      const paymentStatus = localStorage.getItem("paymentStatus");
      if (paymentStatus) {
        let title: string,
          text: string,
          icon: "success" | "error" | "info" | undefined;
        switch (paymentStatus) {
          case "success":
            title = "Successful payment!";
            text = "Your transaction has been completed.";
            icon = "success";
            break;
          case "failure":
            title = "Payment failed!";
            text = "Please try again.";
            icon = "error";
            break;
          case "pending":
            title = "Successful payment!";
            text = "Your transaction has been completed.";
            icon = "success";
            break;
          default:
            title = "";
            text = "";
            icon = undefined; 
            break;
        }
        Swal.fire({
          title,
          text,
          icon,
          confirmButtonText: "Accept",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton:
              "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
        });
        localStorage.removeItem("paymentStatus");
      }
    };

    checkPaymentStatus();

    getMembresia()
      .then((data) => {
        console.log(data);
        const formattedPlans = data.map((plan: any) => ({
          planId: plan.id,
          plan: plan.plan,
          price: plan.price,
          currency: plan.currency || "ARS",
          description: plan.description,
          benefits: plan.benefits,
          idealFor: plan.idealFor,
        }));
        setPlans(formattedPlans);
      })
      .catch((err) => {
        console.error("Error fetching membership data:", err);
        setError("Failed to load plans.");
      });
  }, []);


  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Check Out <span className="text-red-600">Our Plans</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl">
        {plans?.map((plan, index) => (
          <PlanCard
            key={index}
            planId={plan.planId}
            plan={plan.plan}
            price={plan.price}
            currency={plan.currency}
            description={plan.description}
            benefits={plan.benefits}
            idealFor={plan.idealFor}
            userId={user?.id || ""}
          />
        ))}
      </div>
    </div>
  );
};

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  price,
  currency,
  description,
  benefits,
  idealFor,
  planId,
  userId,
}) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const createPreference = async () => {
    if (!user) {
      Swal.fire({
        title: "Hey!",
        text: "You have to be logged in to make a purchase.",
        icon: "warning",
        customClass: {
          popup: "bg-[#222222] text-white",
          title: "text-[#B0E9FF]",
          confirmButton:
            "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        },
        buttonsStyling: false,
      });
      router.push("/login");
      return;
    }

    if (!user?.id || !plan || !price || !currency || !planId) {
      console.error("Faltan datos para crear la preferencia.");
      return;
    }

    const userToken = localStorage.getItem("token");

    const suscripcionData: ISuscriptionData = {
      title: plan,
      quantity: 1,
      currency_id: currency,
      unit_price: Number(price),
      userId: userId,
      token: userToken,
    };

    console.log(suscripcionData);

    try {
      const response = await fetch(
        `${fitZoneApi}/mercadopago/create_preference`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(suscripcionData),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.redirectUrl) {
        localStorage.setItem("paymentStatus", "pending");
        router.push(data.redirectUrl);
      } else {
        console.error(
          "No se recibió una URL de redirección desde Mercado Pago."
        );
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  return (
    <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg flex flex-col mb-10">
      <h3 className="text-2xl font-bold mb-4 text-center">{plan}</h3>
      <p className="mb-4 text-center">{description}</p>
      <ul className="mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center mb-2">
            <FaCheck className="text-green-500 mr-2" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="flex-grow"></div>
      <p className="text-xl mb-4 text-center">
        {price} {currency}
      </p>
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
