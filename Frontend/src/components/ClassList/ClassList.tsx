"use client";
import React, { useEffect, useState } from "react";
import { getClasses, deleteClass, editClass } from "@/lib/server/fetchClasses";
import { getCoaches } from "@/lib/server/fetchCoaches";
import { IUser } from "@/interfaces/interfaces";
import Swal from "sweetalert2";

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
  const [updatedClassData, setUpdatedClassData] = useState<Partial<ClassItem>>(
    {}
  );

  useEffect(() => {
    const fetchClasses = async () => {
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
        console.error("Error fetching classes:", error);
        setError("Error fetching classes");
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-[#222222] text-white",
        title: "text-[#B0E9FF]",
        confirmButton:
          "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
        cancelButton:
          "bg-gray-500 text-white hover:bg-gray-600 py-2 px-4 border-none",
      },
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        await deleteClass(id);
        setClasses(classes.filter((classItem) => classItem.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The class has been deleted.",
          icon: "success",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton:
              "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      } catch (error) {
        console.error("Error deleting class:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the class.",
          icon: "error",
          customClass: {
            popup: "bg-[#222222] text-white",
            title: "text-[#B0E9FF]",
            confirmButton:
              "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
          },
          buttonsStyling: false,
        });
      }
    }
  };

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
          Swal.fire("Success", "Class updated successfully", "success");
        }
      } catch (error) {
        console.error("Error updating class:", error);
        Swal.fire("Error", "There was an error updating the class.", "error");
      }
    }
  };

  if (loading) {
    return <div>Loading classes...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        <span className="text-white">Class</span> List
      </h1>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <div key={classItem.id} className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-red-600">
              {classItem.name}
            </h2>
            <p>{classItem.description}</p>
            <p>
              <strong>Intensity:</strong> {classItem.intensity}
            </p>
            <p>
              <strong>Capacity:</strong> {classItem.capacity}
            </p>
            <p>
              <strong>Status:</strong> {classItem.status}
            </p>
            <p>
              <strong>Duration:</strong> {classItem.duration}
            </p>
            <p>
              <strong>Day:</strong> {classItem.day}
            </p>
            <p>
              <strong>Start Time:</strong> {classItem.starttime}
            </p>
            <p>
              <strong>End Time:</strong> {classItem.endtime}
            </p>
            <p>
              <strong>Coach:</strong>{" "}
              {
                coaches.find((coach) => coach.id === classItem.coach)?.name ||
                  "N/A"
              }
            </p>

            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleEdit(classItem)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              >
                Edit Class
              </button>
              <button
                onClick={() => handleDelete(classItem.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
              >
                Delete Class
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black text-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Edit Class</h2>
            <input
              type="text"
              placeholder="Name"
              value={updatedClassData.name || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  name: e.target.value,
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={updatedClassData.capacity || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  capacity: Number(e.target.value),
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            />
            <select
              value={updatedClassData.intensity || ""}
              onChange={(e) => {
                const value = e.target.value as "low" | "medium" | "high" | "";
                if (
                  value === "low" ||
                  value === "medium" ||
                  value === "high" ||
                  value === ""
                ) {
                  setUpdatedClassData({
                    ...updatedClassData,
                    intensity: value || undefined,
                  });
                }
              }}
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            >
              <option value="">Select Intensity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              value={updatedClassData.status || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Description"
              value={updatedClassData.description || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  description: e.target.value,
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            />
            <select
              value={updatedClassData.duration || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  duration: e.target.value,
                })
              }
              className="w-full bg-black border border-gray-300 p-2 mb-2 text-white rounded focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Duration</option>
              <option value="1 hour">1 hour</option>
              <option value="35 minutes">35 minutes</option>
              <option value="45 minutes">45 minutes</option>
            </select>

            <select
              value={updatedClassData.day || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  day: e.target.value,
                })
              }
              className="bg-black text-white border border-gray-300 p-2 mb-2 w-full"
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

            <input
              type="time"
              placeholder="Start Time"
              value={updatedClassData.starttime || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  starttime: e.target.value,
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            />
            <input
              type="time"
              placeholder="End Time"
              value={updatedClassData.endtime || ""}
              onChange={(e) =>
                setUpdatedClassData({
                  ...updatedClassData,
                  endtime: e.target.value,
                })
              }
              className="bg-black border border-gray-300 p-2 mb-2 w-full"
            />
            <div>
              <label
                htmlFor="coach"
                className="block text-red-600 font-semibold mb-1"
              >
                Coach
              </label>
              <select
                id="coach"
                value={updatedClassData.coach || ""}
                onChange={(e) =>
                  setUpdatedClassData({
                    ...updatedClassData,
                    coach: e.target.value,
                  })
                }
                className="w-full bg-black border border-gray-300 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select a coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleSaveChanges}
              className="bg-green-500 text-white py-1 px-4 rounded mt-4"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditingClass(null)}
              className="bg-gray-500 text-white py-1 px-4 rounded mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassList;
