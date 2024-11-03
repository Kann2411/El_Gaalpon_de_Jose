'use client'
import Loading from '@/components/Loading/Loading';
import { IClassInfo } from '@/interfaces/interfaces';
import { getClassData, getClassRegistration } from '@/lib/server/fetchClasses';
import React, { useEffect, useState } from 'react';

export default function RegistratedClassesView() {
  const [classes, setClasses] = useState<IClassInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeClass, setActiveClass] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassesWithRegistrations = async () => {
      try {
        const classList = await getClassData();
        const classesWithRegistrations = await Promise.all(
          classList.map(async (classItem: { id: string }) => {
            const classDetails = await getClassRegistration(classItem.id);
            return classDetails;
          })
        );

        setClasses(classesWithRegistrations);
      } catch (error) {
        console.error('Error fetching classes with registration:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClassesWithRegistrations();
  }, []);

  const toggleDropdown = (classId: string) => {
    setActiveClass(activeClass === classId ? null : classId);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="text-white bg-black min-h-screen p-8 flex flex-col items-center">
      <h2 className=" text-center text-3xl font-extrabold mb-8 text-white">Classes and <span className='text-red-500'>Registered Users</span></h2>
      <div className="space-y-6 w-2/4 ">
      {classes.length === 0 ? (
  <p className="text-center">There's no available classes</p>
) : (
  classes.map((classInfo, index) => (
    classInfo ? (
      <div key={classInfo.id} className="bg-zinc-900 p-4 rounded-lg shadow-lg">
        <h3
          onClick={() => toggleDropdown(classInfo.id)}
          className="text-lg font-semibold cursor-pointer hover:text-red-500 transition duration-300 flex justify-between items-center"
        >
          {classInfo.name}
          <span className={`ml-2 transition-transform duration-300 ${activeClass === classInfo.id ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </h3>

        {activeClass === classInfo.id && (
          <div className="mt-4">
            {classInfo.registrations.length === 0 ? (
              <p className="text-gray-400">Any user reserved this class</p>
            ) : (
              <ul className="space-y-3">
                {classInfo.registrations.map((registration) => (
                  registration.user ? (
                    <li
                      key={registration.id}
                      className="flex items-center p-3 bg-zinc-800 rounded-lg border border-gray-700 shadow-md"
                    >
                      <img
                        src={registration.user.imgUrl}
                        alt={`${registration.user.name}'s profile`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium">{registration.user.name}</p>
                        <p className="text-xs text-gray-400">Dni: {registration.user.dni}</p>
                        <p className="text-xs text-gray-400">Email: {registration.user.email}</p>
                        <p className="text-xs text-gray-400">Phone: {registration.user.phone}</p>
                      </div>
                    </li>
                  ) : (
                    <p key={registration.id} className="text-gray-400">User information is missing</p>
                  )
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    ) : (
      null
    )
  ))
)}


      </div>
    </div>
  );
}
