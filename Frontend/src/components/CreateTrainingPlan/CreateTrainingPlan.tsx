'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createPlan, uploadImage } from '@/lib/server/fetchCoaches';

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
                        alert('Plan created successfully');
                        resetForm();
                    }
                }
            } catch (error: any) {
                alert(error.message);
            }
        },
    });

    return (
        <div className="bg-black text-white flex flex-col items-center">
            <div className="w-[500px] bg-zinc-900 p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Training Plan</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                        />
                        {formik.touched.description && formik.errors.description ? (
                            <div className="text-red-500 text-sm">{formik.errors.description}</div>
                        ) : null}
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="file">Image</label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            className="bg-zinc-950 border-b-2 border-transparent border-b-red-500 focus:outline-none focus:border-red-700 p-2"
                            onChange={(event) => {
                                formik.setFieldValue("file", event.currentTarget.files![0]);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.file && formik.errors.file ? (
                            <div className="text-red-500 text-sm">{formik.errors.file}</div>
                        ) : null}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                        >
                            Create Plan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTrainingPlan;