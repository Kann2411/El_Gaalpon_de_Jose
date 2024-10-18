'use client'
import {Formik, Form, Field, ErrorMessage} from 'formik';

import { contactValidationSchema } from '@/utils/contactValidationSchema';
import { FormValues } from '@/interfaces/interfaces';


const ContactView: React.FC = () => {
  // Valores iniciales del formulario
  const initialValues: FormValues = {
    name: '',
    username: '',
    phone: '',
    email: '',
    message: '',
  };

  // Manejar el envío del formulario
  const handleSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="container mx-auto p-8 lg:flex lg:justify-between lg:items-start lg:space-x-8 lg:w-3/4 bg-zinc-950 bordershadow-lg">
        {/* Formulario */}
        <div className="lg:w-3/4">
          <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={contactValidationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>
                  {/* Username */}
                  <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                    />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col">
                    <label htmlFor="phone">Phone</label>
                    <Field
                      name="phone"
                      type="text"
                      className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>
                {/* Mensaje */}
                <div className="flex flex-col mt-6">
                  <label htmlFor="message">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                >
                  Send
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {/* Información adicional */}
        <div className="lg:w-1/4 mt-8 lg:mt-0  h-fit text-white">
          <h3 className="text-2xl font-bold mb-4">More Information</h3>
          <div className="flex items-center mb-4">
            {/* SVG de ubicación */}
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5c-1.379 0-2.5-1.121-2.5-2.5S10.621 6.5 12 6.5s2.5 1.121 2.5 2.5-1.121 2.5-2.5 2.5z" />
            </svg>
            Wall Street
          </div>
          <div className="flex items-center mb-4">
            {/* SVG de teléfono */}
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20.487 15.14l-3.75-1.875a1.25 1.25 0 00-1.631.614l-.832 1.666a13.472 13.472 0 01-6.453-6.452l1.667-.832a1.25 1.25 0 00.613-1.631L8.86 3.514a1.25 1.25 0 00-1.45-.614L3.748 4.18a1.25 1.25 0 00-.89 1.198c0 9.05 7.331 16.381 16.38 16.381a1.25 1.25 0 001.198-.889l1.279-3.665a1.25 1.25 0 00-.614-1.45z" />
            </svg>
            (+11) 111 - 111
          </div>
          <div className="flex items-center">
            {/* SVG de email */}
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 4.8-8-4.8V6h16zM4 18v-8l7.437 4.646a1 1 0 001.125 0L20 10v8H4z" />
            </svg>
            fitzone@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
