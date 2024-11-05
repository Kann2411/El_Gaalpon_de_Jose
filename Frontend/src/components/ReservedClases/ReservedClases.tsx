"use client";

import {
  cancelClassRegistration,
  getUserClassRegistration,
} from "@/lib/server/fetchClasses";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { fitZoneApi } from "@/api/rutaApi";
import Swal from "sweetalert2";

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
export const ReservedClasses: React.FC<ReservedClassesProps> = ({ userId }) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${fitZoneApi}/classRegistration/user/${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data) {
          setClasses(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchClasses();
    }
  }, [userId]);

  const handleCancel = async (classId: string) => {
    setLoading(true);
        const response = await fetch(`${fitZoneApi}/classRegistration/${classId}/delete/${userId}`, {
          method: 'DELETE',
        });
    if (response) {
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem.id !== classId)
      );
    }
    setLoading(false);
    Swal.fire({
        title: 'Great!',
        text: 'The appointment has been deleted successfully!',
        icon: 'success',
        customClass: {
            popup: 'bg-[#222222] text-white',
            title: 'text-[#B0E9FF]',
            confirmButton: 'bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none',
        },
        buttonsStyling: false,
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-black p-6 rounded-lg shadow-lg">
      <h2 className="text-white text-2xl font-bold mb-4">Reserved Classes</h2>
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-zinc-900 p-3 rounded-lg shadow-md relative"
            >
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-full h-28 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-lg font-semibold text-red-400">
                  {classItem.name}
                </h3>
                <div className="text-white mt-1">
                  <span className="text-sm">Day: {classItem.day}</span>
                  <br />
                  <span className="text-sm">
                    Duration: {classItem.duration}
                  </span>
                  <br />
                  <span className="text-sm">
                    Time: Start: {classItem.starttime} - End:{" "}
                    {classItem.endtime}
                  </span>
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
