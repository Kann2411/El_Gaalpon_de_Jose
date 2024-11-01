'use client';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/user';
import { getClassRegistration, cancelClassRegistration } from '@/lib/server/fetchClasses';
import Loading from '@/components/Loading/Loading'; // Asegúrate de que la ruta sea correcta

const AppointmentsView: React.FC = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  return (
    <div className="p-4">
      {userId ? (
        <ReservedClasses userId={userId} />
      ) : (
        <p className="text-white">User id not found</p>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      const data = await getClassRegistration(userId);
      if (data) {
        setClasses(data);
      }
      setLoading(false);
    };

    fetchClasses();
  }, [userId]);

  const handleCancel = async (classId: string) => {
    setLoading(true);
    const success = await cancelClassRegistration(classId);
    if (success) {
      setClasses((prevClasses) => prevClasses.filter((classItem) => classItem.id !== classId));
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4">Reserved Classes</h2>
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
                <button
                  onClick={() => handleCancel(classItem.id)}
                  className="mt-4 w-full bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600"
                >
                  Cancel Appointment
                </button>
              </div>
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {classItem.status}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="container mx-auto p-8 bg-zinc-950 shadow-lg">
          <p className="text-white">There's no reserved classes</p>
        </div>
      )}
    </div>
  );
};
