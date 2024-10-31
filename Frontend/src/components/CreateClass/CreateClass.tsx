"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GymClass, IUser, ImageClass } from "@/interfaces/interfaces"; // Asegúrate de importar IUser
import { createGymClass, uploadClassImage } from "@/lib/server/fetchClasses";
import { getUsers } from "@/lib/server/fetchUsers"; // Asegúrate de importar la función para obtener usuarios
import Loading from "@/components/Loading/Loading"; // Asegúrate de que la ruta sea correcta
import Swal from "sweetalert2";

const CreateGymClassForm: React.FC = () => {
  const [loading, setLoading] = useState(false); // Estado de carga
  const [coaches, setCoaches] = useState<IUser[]>([]); // Cambiado el tipo a IUser[]

  const formik = useFormik<GymClass>({
    initialValues: {
      name: "",
      intensity: "",
      capacity: 0,
      status: "Active",
      // file: null,
      description: "",
      duration: "",
      day: "",
      starttime: "",
      endtime: "",
      coach: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      intensity: Yup.string().required("Intensity is required"),
      capacity: Yup.number()
        .required("Capacity is required")
        .min(1, "Capacity must be at least 1"),
      status: Yup.string().required("Status is required"),
      image: Yup.mixed()
        .required("A file is required")
        .test("fileSize", "The file must be smaller than 200KB", (value) => {
          return value && value instanceof File && value.size <= 200 * 1024;
        })
        .test(
          "fileSizeAndType",
          "The file must be smaller than 200KB and in JPG, JPEG, PNG, or WEBP format",
          (value) => {
            return (
              value &&
              value instanceof File &&
              value.size <= 200 * 1024 &&
              ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                value.type
              )
            );
          }
        ),
      description: Yup.string().required("Description is required"),
      duration: Yup.string().required("Duration is required"),
      day: Yup.string().required("Day is required"),
      starttime: Yup.string().required("Start time is required"),
      endtime: Yup.string().required("End time is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      console.log("Submitting values de class:", values);

      try {
        const gymClassData = {
          ...values,
          coach: values.coach,
        };
        // const gymClassResponse = await createGymClass(gymClassData);
        // if (gymClassResponse) {
        //   const uploadResponse = await uploadClassImage(
        //     gymClassResponse.id,
        //     values.file!
        //   );
      //     if (uploadResponse) {
      //       Swal.fire({
      //         title: "Yey!",
      //         text: "Class created successfully!",
      //         icon: "success",
      //         customClass: {
      //           popup: "bg-[#222222] text-white",
      //           title: "text-[#B0E9FF]",
      //           confirmButton:
      //             "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
      //         },
      //         buttonsStyling: false,
      //       });
      //       resetForm();
      //     }
      //   }
      // } catch (error: any) {
      //   Swal.fire({
      //     title: "Ups!",
      //     text: "Error when creating the plan",
      //     icon: "error",
      //     customClass: {
      //       popup: "bg-[#222222] text-white",
      //       title: "text-[#B0E9FF]",
      //       confirmButton:
      //         "bg-[#B0E9FF] text-[#222222] hover:bg-[#6aa4bb] py-2 px-4 border-none",
      //     },
      //     buttonsStyling: false,
      //   });
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    },
  });

  // useEffect para obtener los coaches
  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const users = await getUsers(); // Asegúrate de que esta función devuelva una lista de usuarios
        const filteredCoaches = users.filter((user) => user.role === "coach"); // Filtrar por rol "coach"
        setCoaches(filteredCoaches); // Actualizar el estado de coaches
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCoaches(); // Llamar a la función para obtener los coaches
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files?.[0]; // Obtener el primer archivo
    formik.setFieldValue("image", image); // Establecer el valor del archivo en Formik
  };

  if (loading) {
    return <Loading />; // Mostrar el componente de carga
  }

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
            {/* Image cambio*/}
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={handleFileChange} // Manejar el cambio de archivo
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2 w-full"
              />
              {/* {formik.errors.file && formik.touched.file && (
                <div className="text-red-500">{formik.errors.file}</div>
              )} */}
            </div>
            {/* Campo para seleccionar el coach */}
            <div>
              <label htmlFor="coach">Coach</label>
              <select
                id="coach"
                name="coach"
                onChange={formik.handleChange}
                value={formik.values.coach}
                className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2 w-full"
              >
                <option value="">Select a coach</option>
                {coaches.map((coach) => (
                  <option key={coach.id} value={coach.id}>
                    {coach.name}
                  </option>
                ))}
              </select>
            </div>
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
          <button
            type="submit"
            className="mt-6 bg-red-700 hover:bg-red-600 text-white p-2 rounded"
          >
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGymClassForm;
