"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GymClass } from "@/interfaces/interfaces";
import { createGymClass } from "@/lib/server/fetchClasses";

const CreateGymClassForm: React.FC = () => {
  const formik = useFormik<GymClass>({
    initialValues: {
      name: "",
      intensity: "",
      capacity: 0,
      status: "Active",
      image: "",
      description: "",
      duration: "",
      day: "",
      starttime: "",
      endtime: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      intensity: Yup.string().required("Intensity is required"),
      capacity: Yup.number()
        .required("Capacity is required")
        .min(1, "Capacity must be at least 1"),
      status: Yup.string().required("Status is required"),
      image: Yup.string()
        .url("Must be a valid URL")
        .required("Image is required"),
      description: Yup.string().required("Description is required"),
      duration: Yup.string().required("Duration is required"),
      day: Yup.string().required("Day is required"),
      starttime: Yup.string().required("Start time is required"),
      endtime: Yup.string().required("End time is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await createGymClass(values);
        alert("Class created successfully: " + response.id);
        formik.resetForm();
      } catch (error) {
        const errorMessage = (error as Error).message || "Unknown error";
        alert("Error when creating the class: " + errorMessage);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="w-[500px] h-[auto] bg-zinc-900 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Class
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            {/* Intensity */}
            <div className="flex flex-col">
              <label htmlFor="intensity">Intensity</label>
              <input
                id="intensity"
                name="intensity"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.intensity}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.intensity && (
                <div className="text-red-500 text-sm">
                  {formik.errors.intensity}
                </div>
              )}
            </div>
            {/* Capacity */}
            <div className="flex flex-col">
              <label htmlFor="capacity">Capacity</label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.capacity}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.capacity && (
                <div className="text-red-500 text-sm">
                  {formik.errors.capacity}
                </div>
              )}
            </div>
            {/* Status */}
            <div className="flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              >
                <option value="Active">Active</option>
                <option value="Finished">Finished</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {formik.errors.status && (
                <div className="text-red-500 text-sm">
                  {formik.errors.status}
                </div>
              )}
            </div>
            {/* Duration */}
            <div className="flex flex-col">
              <label htmlFor="duration">Duration</label>
              <input
                id="duration"
                name="duration"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.duration}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.duration && (
                <div className="text-red-500 text-sm">
                  {formik.errors.duration}
                </div>
              )}
            </div>
            {/* Day */}
            <div className="flex flex-col">
              <label htmlFor="day">Day</label>
              <input
                id="day"
                name="day"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.day}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.day && (
                <div className="text-red-500 text-sm">{formik.errors.day}</div>
              )}
            </div>
            {/* Start Time */}
            <div className="flex flex-col">
              <label htmlFor="starttime">Start Time</label>
              <input
                id="starttime"
                name="starttime"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.starttime}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.starttime && (
                <div className="text-red-500 text-sm">
                  {formik.errors.starttime}
                </div>
              )}
            </div>
            {/* End Time */}
            <div className="flex flex-col">
              <label htmlFor="endtime">End Time</label>
              <input
                id="endtime"
                name="endtime"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.endtime}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
              />
              {formik.errors.endtime && (
                <div className="text-red-500 text-sm">
                  {formik.errors.endtime}
                </div>
              )}
            </div>
            {/* Image */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="image">URL Image</label>
              <input
                id="image"
                name="image"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.image}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2 w-full" // Asegura que ocupe todo el ancho
              />
              {formik.errors.image && (
                <div className="text-red-500 text-sm">
                  {formik.errors.image}
                </div>
              )}
            </div>
            {/* Description */}
            <div className="flex flex-col col-span-2">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                rows={4}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2 w-full" // Asegura que ocupe todo el ancho
              />
              {formik.errors.description && (
                <div className="text-red-500 text-sm">
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>
          {/* Botón de envío */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            >
              Create Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGymClassForm;
