"use client";
import React, { useEffect, useState } from "react";
import { useFormik, ErrorMessage } from "formik";
import { classValidationSchema } from "@/utils/classValidationSchema";
import { IClassData, IUser } from "@/interfaces/interfaces";
import { getCoaches, uploadClassImage } from "@/lib/server/fetchCoaches";
import Swal from "sweetalert2";

const CreateClassForm: React.FC = () => {
  const [coaches, setCoaches] = useState<IUser[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const coaches = await getCoaches();
        setCoaches(coaches);
      } catch (error) {
        console.error("Error al obtener los entrenadores:", error);
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
      coach: "",
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
          const response = await uploadClassImage(
            classData.class.id,
            selectedImage
          );
          console.log("Respuesta de subida de imagen:", response);

          // Toast notification para éxito
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Class created successfully!",
            showConfirmButton: false,
            timer: 3500,
            toast: true,
            background: "#222222",
            color: "#ffffff",
            customClass: {
              popup: "animated slideInRight",
            },
          });

          formik.resetForm();
        }
      } catch (error) {
        console.error("Error when creating the class", error);

        // Toast notification para error
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error when creating the class",
          showConfirmButton: false,
          timer: 3500,
          toast: true,
          background: "#222222",
          color: "#ffffff",
          customClass: {
            popup: "animated slideInRight",
          },
        });
      }
    },
  });

  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        <span className="text-white">Create</span> Class
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label
              htmlFor="name"
              className="block text-red-600 font-semibold mb-1"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white  focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          {/* Intensidad */}
          <div>
            <label
              htmlFor="intensity"
              className="block text-red-600 font-semibold mb-1"
            >
              Intensity
            </label>
            <select
              id="intensity"
              {...formik.getFieldProps("intensity")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select intensity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {formik.touched.intensity && formik.errors.intensity ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.intensity}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Capacidad */}
          <div>
            <label
              htmlFor="capacity"
              className="block text-red-600 font-semibold mb-1"
            >
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              {...formik.getFieldProps("capacity")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white  focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.capacity && formik.errors.capacity ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.capacity}
              </div>
            ) : null}
          </div>

          {/* Coach */}
          <div>
            <label
              htmlFor="coach"
              className="block text-red-600 font-semibold mb-1"
            >
              Coach
            </label>
            <select
              id="coach"
              {...formik.getFieldProps("coach")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select a coach</option>
              {coaches.map((coach) => (
                <option key={coach.id} value={coach.id}>
                  {coach.name}
                </option>
              ))}
            </select>
            {formik.touched.coach && formik.errors.coach ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.coach}
              </div>
            ) : null}
          </div>
        </div>

        {/* Subir Imagen */}
        <div>
          <label
            htmlFor="image"
            className="block text-red-600 font-semibold mb-1"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setSelectedImage(file);
            }}
            className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Descripción */}
        <div>
          <label
            htmlFor="description"
            className="block text-red-600 font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...formik.getFieldProps("description")}
            onBlur={formik.handleBlur}
            className="w-full bg-black border border-grey-600 p-2 rounded text-white placeholder-red-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Duración */}
          <div>
            <label
              htmlFor="duration"
              className="block text-red-600 font-semibold mb-1"
            >
              Duration
            </label>
            <select
              id="duration"
              {...formik.getFieldProps("duration")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select duration</option>
              <option value="1 hour">1 hour</option>
              <option value="35 minutes">35 minutes</option>
              <option value="45 minutes">45 minutes</option>
            </select>
            {formik.touched.duration && formik.errors.duration ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.duration}
              </div>
            ) : null}
          </div>

          {/* Día de la semana */}
          <div>
            <label
              htmlFor="day"
              className="block text-red-600 font-semibold mb-1"
            >
              Day
            </label>
            <select
              id="day"
              {...formik.getFieldProps("day")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            {formik.touched.day && formik.errors.day ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.day}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Hora de inicio */}
          <div>
            <label
              htmlFor="starttime"
              className="block text-red-600 font-semibold mb-1"
            >
              Start time
            </label>
            <input
              id="starttime"
              type="time"
              {...formik.getFieldProps("starttime")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.starttime && formik.errors.starttime ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.starttime}
              </div>
            ) : null}
          </div>

          {/* Hora de finalización */}
          <div>
            <label
              htmlFor="endtime"
              className="block text-red-600 font-semibold mb-1"
            >
              End time
            </label>
            <input
              id="endtime"
              type="time"
              {...formik.getFieldProps("endtime")}
              onBlur={formik.handleBlur}
              className="w-full bg-black border border-grey-600 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {formik.touched.endtime && formik.errors.endtime ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.endtime}
              </div>
            ) : null}
          </div>
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Create Class
        </button>
      </form>
    </div>
  );
};

export default CreateClassForm;
