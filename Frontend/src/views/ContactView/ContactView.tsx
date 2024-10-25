'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactValidationSchema } from '@/utils/contactValidationSchema';
import { FormValues } from '@/interfaces/interfaces';
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

const ContactView: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    username: '',
    phone: '',
    email: '',
    message: '',
  };

  const handleSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <div className="flex space-x-0">
        {/* Formulario */}
        <div className="w-[500px] h-[920px] bg-zinc-900 p-8 ">
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
        <div className="w-[445px] h-[900px] bg-gray-800 p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">More</h3>
          <div className="flex items-center mb-5">
            <FaLocationDot className='w-5 h-6 text-red-600 mr-2' />
            Wall Street
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className='w-5 h-6 text-red-600 mr-2' />
            (+11) 111 - 111
          </div>
          <div className="flex items-center">
            <IoMdMail className='w-5 h-6 text-red-600 mr-2' />
            fitzone@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;