"use client";
import React, { useEffect, useState } from "react";
import { getClasses, editClass, deleteClass } from "@/lib/server/fetchClasses";
import { getCoaches } from "@/lib/server/fetchCoaches";
import { IUser } from "@/interfaces/interfaces";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

export interface ClassItem {
  id: string;
  name: string;
  intensity: "low" | "medium" | "high";
  capacity: number;
  status: "Active" | "Inactive";
  description: string;
  duration: string;
  day: string;
  starttime: string;
  endtime: string;
  coach: string;
}

const ClassList: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [coaches, setCoaches] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [updatedClassData, setUpdatedClassData] = useState<Partial<ClassItem>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classList = await getClasses();
        const coachList = await getCoaches();
        if (classList) {
          const formattedClasses = classList.map((classData, index) => ({
            ...classData,
            id: classData.id || `generated-id-${index}`,
          }));
          setClasses(formattedClasses);
        } else {
          setClasses([]);
        }
        if (coachList) {
          setCoaches(coachList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (classItem: ClassItem) => {
    setEditingClass(classItem);
    setUpdatedClassData({
      name: classItem.name,
      intensity: classItem.intensity,
      capacity: classItem.capacity,
      status: classItem.status,
      description: classItem.description,
      duration: classItem.duration,
      day: classItem.day,
      starttime: classItem.starttime,
      endtime: classItem.endtime,
      coach: classItem.coach,
    });
  };

  const handleSaveChanges = async () => {
    if (editingClass) {
      try {
        const updated = await editClass(editingClass.id, updatedClassData);
        if (updated) {
          setClasses((prev) =>
            prev.map((classItem) =>
              classItem.id === updated.id ? updated : classItem
            )
          );
          setEditingClass(null);
          await Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Class updated successfully',
            background: '#1F2937',
            color: '#ffffff',
            customClass: {
              popup: 'rounded-lg shadow-md text-sm font-sans',
            },
          });
        }
      } catch (error) {
        console.error("Error updating class:", error);
        await Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Error updating class',
          background: '#1F2937',
          color: '#ffffff',
          customClass: {
            popup: 'rounded-lg shadow-md text-sm font-sans',
          },
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        background: '#1F2937',
        color: '#ffffff',
        customClass: {
          popup: 'rounded-lg shadow-md text-sm font-sans',
        },
      });

      if (result.isConfirmed) {
        await deleteClass(id);
        setClasses(classes.filter(classItem => classItem.id !== id));
        await Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Class deleted successfully',
          background: '#1F2937',
          color: '#ffffff',
          customClass: {
            popup: 'rounded-lg shadow-md text-sm font-sans',
          },
        });
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      await Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'Error deleting class',
        background: '#1F2937',
        color: '#ffffff',
        customClass: {
          popup: 'rounded-lg shadow-md text-sm font-sans',
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center text-xl mt-8">{error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl max-w-7xl mx-auto my-16">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold">
          Class <span className="text-red-600">List</span>
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((classItem) => (
          <motion.div
            key={classItem.id}
            className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold text-red-500">{classItem.name}</h2>
              <div className="flex space-x-2">
                {/* <button
                  onClick={() => handleEdit(classItem)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <Edit2 size={16} />
                </button> */}
                <button
                  onClick={() => handleDelete(classItem.id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{classItem.description}</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Intensity</p>
                <p className="text-gray-300">{classItem.intensity}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Capacity</p>
                <p className="text-gray-300">{classItem.capacity}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Status</p>
                <p className="text-gray-300">{classItem.status}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Duration</p>
                <p className="text-gray-300">{classItem.duration}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Day</p>
                <p className="text-gray-300">{classItem.day}</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-400">Time</p>
                <p className="text-gray-300">{classItem.starttime} - {classItem.endtime}</p>
              </div>
              <div className="col-span-2 space-y-1">
                <p className="font-semibold text-red-400">Coach</p>
                <p className="text-gray-300">
                  {coaches.find((coach) => coach.id === classItem.coach)?.name || "N/A"}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {editingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-800 text-white p-8 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-red-500 font-semibold">Edit Class</h2>
              <button
                onClick={() => setEditingClass(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Name</label>
                <input
                  type="text"
                  value={updatedClassData.name || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, name: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Intensity</label>
                <select
                  value={updatedClassData.intensity || ""}
                  onChange={(e) => {
                    const value = e.target.value as "low" | "medium" | "high" | "";
                    if (value === "low" || value === "medium" || value === "high" || value === "") {
                      setUpdatedClassData({ ...updatedClassData, intensity: value || undefined });
                    }
                  }}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Intensity</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Capacity</label>
                <input
                  type="number"
                  value={updatedClassData.capacity || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, capacity: Number(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Status</label>
                <select
                  value={updatedClassData.status || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, status: e.target.value as "Active" | "Inactive" })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Duration</label>
                <select
                  value={updatedClassData.duration || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, duration: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Duration</option>
                  <option value="1 hour">1 hour</option>
                  <option value="35 minutes">35 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Day</label>
                <select
                  value={updatedClassData.day || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, day: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Start Time</label>
                <input
                  type="time"
                  value={updatedClassData.starttime || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, starttime: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">End Time</label>
                <input
                  type="time"
                  value={updatedClassData.endtime || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, endtime: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-red-400 font-semibold">Coach</label>
                <select
                  value={updatedClassData.coach || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, coach: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select Coach</option>
                  {coaches.map((coach) => (
                    <option key={coach.id} value={coach.id}>
                      {coach.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="lg:col-span-3">
                <label className="block text-red-400 font-semibold mb-2">Description</label>
                <textarea
                  value={updatedClassData.description || ""}
                  onChange={(e) => setUpdatedClassData({ ...updatedClassData, description: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end mt-8 space-x-4">
              <button
                onClick={() => setEditingClass(null)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ClassList;