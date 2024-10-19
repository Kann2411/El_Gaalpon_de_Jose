import React from "react";

const PlansView = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Título centrado */}
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">
          Conoce nuestros <span className="text-red-600">planes</span>
        </h2>
      </div>

      {/* Contenedor de los planes */}
      <div className="container mx-auto p-8 flex flex-col lg:flex-row lg:justify-between lg:items-start lg:space-x-8 lg:w-3/4 bg-zinc-950 shadow-lg">
        {/* Plan Básico */}
        <div className="lg:w-1/2 p-4 bg-zinc-900 rounded-lg shadow-md flex flex-col justify-between min-h-[600px]">
          <div className="text-center">
            <div className="text-lg font-extrabold text-[#aba6a6]">/Mes</div>
            <div className="text-2xl font-extrabold text-white mt-2">
              Plan Básico
            </div>
            <div className="flex justify-center items-baseline mt-4">
              <span className="text-4xl font-extrabold text-white">$</span>
              <span className="text-6xl font-extrabold text-white">49</span>
            </div>
          </div>
          <ul className="mt-8 space-y-4 text-white">
            <li className="flex justify-between">
              <span>Acceso ilimitado al gimnasio</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between text-gray-500">
              <span>Acceso 24/7 al gimnasio</span>
            </li>
            <li className="flex justify-between">
              <span>Clases grupales básicas</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between text-gray-500">
              <span>Clases grupales avanzadas</span>
            </li>
            <li className="flex justify-between">
              <span>Uso de vestuarios y duchas</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between text-gray-500">
              <span>Un plan de entrenamiento básico</span>
            </li>
            <li className="flex justify-between">
              <span>Acceso a zonas de cardio</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
              Elegir Plan
            </button>
          </div>
        </div>

        {/* Plan Premium */}
        <div className="lg:w-1/2 p-4 bg-zinc-900 rounded-lg shadow-md flex flex-col justify-between min-h-[600px] mt-10 lg:mt-0">
          <div className="text-center">
            <div className="text-lg font-extrabold text-[#aba6a6]">/Mes</div>
            <div className="text-2xl font-extrabold text-white mt-2">
              Plan Premium
            </div>
            <div className="flex justify-center items-baseline mt-4">
              <span className="text-4xl font-extrabold text-white">$</span>
              <span className="text-6xl font-extrabold text-white">55</span>
            </div>
          </div>
          <ul className="mt-8 space-y-4 text-white">
            <li className="flex justify-between">
              <span>Acceso ilimitado al gimnasio</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Acceso 24/7 al gimnasio</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Clases grupales básicas</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Clases grupales avanzadas</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Uso de vestuarios y duchas</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Un plan de entrenamiento básico</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
            <li className="flex justify-between">
              <span>Acceso a zonas de cardio</span>
              <div className="w-6 h-6 bg-red-600 rounded-full" />
            </li>
          </ul>
          <div className="flex justify-center mt-4">
            <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
              Elegir Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansView;
