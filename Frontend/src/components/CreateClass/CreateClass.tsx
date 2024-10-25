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
      name: Yup.string().required('Name is required'),
      intensity: Yup.string().required('Intensity is required'),
      capacity: Yup.number()
          .required('Capacity is required')
          .min(1, 'Capacity must be at least 1'),
      status: Yup.string().required('Status is required'),
      image: Yup.string().url('Must be a valid URL').required('Image is required'),
      description: Yup.string().required('Description is required'),
      duration: Yup.string().required('Duration is required'),
      day: Yup.string().required('Day is required'),
      starttime: Yup.string().required('Start time is required'),
      endtime: Yup.string().required('End time is required'),
  }),
  
    onSubmit: async (values) => {
        try {
            const response = await createGymClass(values);
            alert('Class created successfully: ' + response.id);
            formik.resetForm();
          } catch (error) {
            const errorMessage = (error as Error).message || 'Unknow error';
            alert('Error when creating the class ' + errorMessage);
          }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
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
        <label htmlFor="intensity">Intensity</label>
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
        <label htmlFor="capacity">Capacity</label>
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
        <label htmlFor="status">Status</label>
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
        <label htmlFor="image">URL Image</label>
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
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        {formik.errors.description && <div>{formik.errors.description}</div>}
      </div>

      <div>
        <label htmlFor="duration">Duration</label>
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
        <label htmlFor="day">Day</label>
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
        <label htmlFor="starttime">Start Time</label>
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
        <label htmlFor="endtime">End Time</label>
        <input
          id="endtime"
          name="endtime"
          type="time"
          onChange={formik.handleChange}
          value={formik.values.endtime}
        />
        {formik.errors.endtime && <div>{formik.errors.endtime}</div>}
      </div>

      <button type="submit">Create class</button>
    </form>
  );
};

export default CreateGymClassForm;
