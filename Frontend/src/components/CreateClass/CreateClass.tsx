"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { classValidationSchema } from "@/utils/classValidationSchema";
import { IClassData, IUser } from "@/interfaces/interfaces";
import { getCoaches, uploadClassImage } from "@/lib/server/fetchCoaches";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Upload, Clock, Calendar, User } from "lucide-react";



const CreateClassForm: React.FC = () => {
  const [coaches, setCoaches] = useState<IUser[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const coaches = await getCoaches();
        setCoaches(coaches);
      } catch (error) {
        console.error("Error fetching coaches:", error);
      }
    };
    fetchCoaches();
  }, []);

  

  const formik = useFormik<IClassData>({
    initialValues: {
      name: "",
      intensity: "low",
      capacity: 0,
      status: "Active",
      description: "",
      duration: "",
      day: "",
      starttime: "",
      endtime: "",
      coach: "", // se seleccionará el ID del coach
    },
    validationSchema: classValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/class", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const classData = await response.json();

        if (classData && selectedImage) {
          await uploadClassImage(classData.class.id, selectedImage);

          await Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: "Class created successfully!",
            background: "#1F2937",
            color: "#ffffff",
            customClass: { popup: "rounded-lg shadow-md text-sm font-sans" },
          });

          formik.resetForm();
          setSelectedImage(null);
        }
      } catch (error) {
        console.error("Error creating class:", error);

        await Swal.fire({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: "Error creating class",
          background: "#1F2937",
          color: "#ffffff",
          customClass: { popup: "rounded-lg shadow-md text-sm font-sans" },
        });
      }
    },
  });

  return (
    <motion.div
      className="bg-gray-900 text-white p-8 rounded-lg shadow-2xl max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-red-500 mb-12 text-center">
        Create New Class
      </h1>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Basic Information */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-red-400 font-semibold">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              placeholder="Class name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="intensity"
              className="block text-red-400 font-semibold"
            >
              Intensity
            </label>
            <select
              id="intensity"
              {...formik.getFieldProps("intensity")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              <option value="">Select intensity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.intensity && formik.errors.intensity && (
              <div className="text-red-500 text-sm">
                {formik.errors.intensity}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="capacity"
              className="block text-red-400 font-semibold"
            >
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              {...formik.getFieldProps("capacity")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              placeholder="Number of participants"
            />
            {formik.touched.capacity && formik.errors.capacity && (
              <div className="text-red-500 text-sm">
                {formik.errors.capacity}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="coach" className="block text-red-400 font-semibold">
              Coach
            </label>
            <div className="relative">
              <select
                id="coach"
                {...formik.getFieldProps("coach")}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 appearance-none pr-10"
              >
                <option value="">Select coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
              <User
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {formik.touched.coach && formik.errors.coach && (
              <div className="text-red-500 text-sm">{formik.errors.coach}</div>
            )}
          </div>
        </div>

        {/* Schedule Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="duration"
              className="block text-red-400 font-semibold"
            >
              Duration
            </label>
            <div className="relative">
              <select
                id="duration"
                {...formik.getFieldProps("duration")}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 appearance-none pr-10"
              >
                <option value="">Select duration</option>
                <option value="1 hour">1 hour</option>
                <option value="35 minutes">35 minutes</option>
                <option value="45 minutes">45 minutes</option>
              </select>
              <Clock
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {formik.touched.duration && formik.errors.duration && (
              <div className="text-red-500 text-sm">
                {formik.errors.duration}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="day" className="block text-red-400 font-semibold">
              Day
            </label>
            <div className="relative">
              <select
                id="day"
                {...formik.getFieldProps("day")}
                className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 appearance-none pr-10"
              >
                <option value="">Select day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <Calendar
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            {formik.touched.day && formik.errors.day && (
              <div className="text-red-500 text-sm">{formik.errors.day}</div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="starttime"
              className="block text-red-400 font-semibold"
            >
              Start Time
            </label>
            <input
              id="starttime"
              type="time"
              {...formik.getFieldProps("starttime")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            {formik.touched.starttime && formik.errors.starttime && (
              <div className="text-red-500 text-sm">
                {formik.errors.starttime}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="endtime"
              className="block text-red-400 font-semibold"
            >
              End Time
            </label>
            <input
              id="endtime"
              type="time"
              {...formik.getFieldProps("endtime")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            />
            {formik.touched.endtime && formik.errors.endtime && (
              <div className="text-red-500 text-sm">
                {formik.errors.endtime}
              </div>
            )}
          </div>
        </div>

        {/* Description and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-red-400 font-semibold"
            >
              Description
            </label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              rows={4}
              placeholder="Describe the class"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-red-400 font-semibold">
              Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-[160px] border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition duration-300"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setSelectedImage(file);
                  }}
                />
              </label>
            </div>
            {selectedImage && (
              <p className="text-sm text-gray-400 mt-2">
                Selected file: {selectedImage.name}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105"
        >
          Create Class
        </button>
      </form>
    </motion.div>
  );
};

export default CreateClassForm;
