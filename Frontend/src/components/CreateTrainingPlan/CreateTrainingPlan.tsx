'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPlan, uploadImage } from '@/lib/server/fetchCoaches';
import Swal from 'sweetalert2'

interface FormValues {
    description: string;
    file: File | null;
}

const CreateTrainingPlan: React.FC = () => {
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required')
            .max(255, 'Description cannot exceed 255 characters'),
        file: Yup.mixed()
            .required('A file is required')
            .test('fileSize', 'The file must be smaller than 200KB', (value) => {
                return value && value instanceof File && value.size <= 200 * 1024;
            })
            .test('fileType', 'Only JPG, JPEG, PNG, or WEBP files are allowed', (value) => {
                return value && value instanceof File &&
                    ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
            }),
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            description: '',
            file: null,
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const planResponse = await createPlan(values.description);
                if (planResponse) {
                    const uploadResponse = await uploadImage(planResponse.id, values.file!);
                    if (uploadResponse) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Plan created successfully!',
                            icon: 'success',
                            customClass: {
                              popup: 'bg-black text-white',
                              title: 'text-red-500',
                              confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-full transition-colors duration-200',
                            },
                            buttonsStyling: false,
                          });
                        resetForm();
                    }
                }
            } catch (error: any) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error when creating the plan',
                    icon: 'error',
                    customClass: {
                      popup: 'bg-black text-white',
                      title: 'text-red-500',
                      confirmButton: 'bg-red-600 text-white hover:bg-red-700 py-2 px-4 rounded-full transition-colors duration-200',
                    },
                    buttonsStyling: false,
                  });
            }
        },
    });

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Create Training Plan</h2>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                    )}
                </div>

                <div>
                    <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-1">Image</label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200"
                        onChange={(event) => {
                            formik.setFieldValue("file", event.currentTarget.files![0]);
                        }}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.file && formik.errors.file && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.file}</div>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
                    >
                        Create Plan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTrainingPlan;