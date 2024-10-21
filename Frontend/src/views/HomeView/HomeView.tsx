import React from 'react';

const HomeView: React.FC = () => {
  // Datos de ejemplo para las clases grupales
  const groupClasses = [
    { id: 1, title: 'Yoga', time: '10:00 AM' },
    { id: 2, title: 'Zumba', time: '11:00 AM' },
    { id: 3, title: 'Pilates', time: '12:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Título centrado */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Clases <span className="text-red-600">Grupales</span>
        </h1>
      </div>

      {/* Contenedor de clases grupales */}
      <div className="container mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {groupClasses.length > 0 ? (
          groupClasses.map((groupClass) => (
            <div key={groupClass.id} className="bg-zinc-900 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">{groupClass.title}</h3>
              <p className="text-gray-400 mb-4">Hora: {groupClass.time}</p>
              <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                Reservar
              </button>
            </div>
          ))
        ) : (
          <p>No hay clases grupales disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default HomeView;

