'use client'
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GymClass } from '@/interfaces/interfaces';
import { createGymClass } from '@/lib/server/fetchClasses';

const CreateGymClassForm: React.FC = () => {
  const formik = useFormik<GymClass>({
    initialValues: {
      name: '',
      intensity: '',
      capacity: 0,
      status: 'Active',
      image: '',
      description: '',
      duration: '',
      day: '',
      starttime: '',
      endtime: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      intensity: Yup.string().required('La intensidad es obligatoria'),
      capacity: Yup.number()
        .required('La capacidad es obligatoria')
        .min(1, 'La capacidad debe ser al menos 1'),
      status: Yup.string().required('El estado es obligatorio'),
      image: Yup.string().url('Debe ser una URL válida').required('La imagen es obligatoria'),
      description: Yup.string().required('La descripción es obligatoria'),
      duration: Yup.string().required('La duración es obligatoria'),
      day: Yup.string().required('El día es obligatorio'),
      starttime: Yup.string().required('La hora de inicio es obligatoria'),
      endtime: Yup.string().required('La hora de fin es obligatoria'),
    }),
    onSubmit: async (values) => {
        try {
            const response = await createGymClass(values);
            alert('Clase creada con éxito: ' + response.id);
            // Resetea el formulario si es necesario
            formik.resetForm();
          } catch (error) {
            const errorMessage = (error as Error).message || 'Error desconocido';
            alert('Error al crear la clase: ' + errorMessage);
          }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && <div>{formik.errors.name}</div>}
      </div>

      <div>
        <label htmlFor="intensity">Intensidad</label>
        <input
          id="intensity"
          name="intensity"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.intensity}
        />
        {formik.errors.intensity && <div>{formik.errors.intensity}</div>}
      </div>

      <div>
        <label htmlFor="capacity">Capacidad</label>
        <input
          id="capacity"
          name="capacity"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.capacity}
        />
        {formik.errors.capacity && <div>{formik.errors.capacity}</div>}
      </div>

      <div>
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        >
          <option value="Active">Active</option>
          <option value="Finished">Finished</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        {formik.errors.status && <div>{formik.errors.status}</div>}
      </div>

      <div>
        <label htmlFor="image">Imagen URL</label>
        <input
          id="image"
          name="image"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.image}
        />
        {formik.errors.image && <div>{formik.errors.image}</div>}
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && <div>{formik.errors.description}</div>}
      </div>

      <div>
        <label htmlFor="duration">Duración</label>
        <input
          id="duration"
          name="duration"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.duration}
        />
        {formik.errors.duration && <div>{formik.errors.duration}</div>}
      </div>

      <div>
        <label htmlFor="day">Día</label>
        <input
          id="day"
          name="day"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.day}
        />
        {formik.errors.day && <div>{formik.errors.day}</div>}
      </div>

      <div>
        <label htmlFor="starttime">Hora de Inicio</label>
        <input
          id="starttime"
          name="starttime"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.starttime}
        />
        {formik.errors.starttime && <div>{formik.errors.starttime}</div>}
      </div>

      <div>
        <label htmlFor="endtime">Hora de Fin</label>
        <input
          id="endtime"
          name="endtime"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.endtime}
        />
        {formik.errors.endtime && <div>{formik.errors.endtime}</div>}
      </div>

      <button type="submit">Crear Clase</button>
    </form>
  );
};

export default CreateGymClassForm;
