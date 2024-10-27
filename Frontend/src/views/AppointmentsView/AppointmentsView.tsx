'use client'
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { getClassRegistration } from '@/lib/server/fetchClasses';

const AppointmentsView: React.FC = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  return (
    <div className="p-4">
      {userId ? (
        <ReservedClasses userId={userId} />
      ) : (
        <p className="text-white">No se ha encontrado el ID del usuario.</p>
      )}
    </div>
  );
};

export default AppointmentsView;

interface ClassItem {
  id: string;
  name: string;
  intensity: string;
  capacity: number;
  status: string;
  image: string;
  description: string;
  duration: string;
  day: string;
  starttime: string;
  endtime: string;
}

interface ReservedClassesProps {
  userId: string;
}

const ReservedClasses: React.FC<ReservedClassesProps> = ({ userId }) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getClassRegistration(userId);
      if (data) {
        setClasses(data);
      }
    };

    fetchClasses();
  }, [userId]);

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4">Clases Reservadas</h2>
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-zinc-900 p-3 rounded-lg shadow-md relative">
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-red-400">{classItem.name}</h3>
                <div className="text-white mt-1">
                  <span className="text-sm">Day: {classItem.day}</span>
                  <br />
                  <span className="text-sm">Duration: {classItem.duration}</span>
                  <br />
                  <span className="text-sm">Time: Start: {classItem.starttime} - End: {classItem.endtime}</span>
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {classItem.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white">There's no reservated classes</p>
      )}
    </div>
  );
};
