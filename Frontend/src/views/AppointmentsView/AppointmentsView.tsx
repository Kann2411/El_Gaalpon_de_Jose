import React from 'react';

const AppointmentsView: React.FC = () => {
  // Sample data for appointments
  const appointments = [
    { id: 1, date: '2024-10-21', time: '02:00 PM', description: 'Yoga Class', status: 'Reserved' },
    { id: 2, date: '2024-10-22', time: '03:00 PM', description: 'Zumba Class', status: 'Reserved' },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Title for appointments */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          My <span className="text-red-600">Appointments</span>
        </h1>
      </div>

      {/* Container for appointments */}
      <div className="container mx-auto p-8 bg-zinc-950 shadow-lg">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id} className="bg-zinc-900 p-4 rounded-lg shadow-md mb-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">{appointment.description}</h2>
                <div className="flex space-x-8">
                  <p className="text-gray-400">Date: {appointment.date}</p>
                  <p className="text-gray-400">Time: {appointment.time}</p>
                  <p className="text-gray-400">Status: {appointment.status}</p>
                </div>
                <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You have no appointments scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentsView;