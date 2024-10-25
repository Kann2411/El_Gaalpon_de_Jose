import React from 'react';

const AppointmentsView: React.FC = () => {
  // Datos de ejemplo para las reservas
  const appointments = [
    { id: 1, date: '2024-10-21', time: '02:00 PM', description: 'Clase de Yoga', status: 'Reservado' },
    { id: 2, date: '2024-10-22', time: '03:00 PM', description: 'Clase de Zumba', status: 'Reservado' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Título para reservas */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Mis <span className="text-red-600">Reservas</span>
        </h1>
      </div>

      {/* Contenedor de reservas */}
      <div className="container mx-auto p-8 bg-zinc-950 shadow-lg">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="bg-zinc-900 p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold">{appointment.description}</h2>
              <p className="text-gray-400">Fecha: {appointment.date}</p>
              <p className="text-gray-400">Hora: {appointment.time}</p>
              <p className="text-gray-400">Estado: {appointment.status}</p>
              <button className="mt-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                Cancelar Reserva
              </button>
            </div>
          ))
        ) : (
          <p>No tienes reservas realizadas.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsView;

//Comentario
