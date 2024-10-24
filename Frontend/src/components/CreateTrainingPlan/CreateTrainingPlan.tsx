'use client'
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
            .required('La descripción es obligatoria')
            .max(255, 'La descripción no puede exceder 255 caracteres'),
        file: Yup.mixed()
            .required('Se requiere un archivo')
            .test('fileSize', 'El archivo debe ser menor a 200KB', (value) => {
                return value && value instanceof File && value.size <= 200 * 1024;
            })
            .test('fileType', 'Solo se permiten archivos JPG, JPEG, PNG o WEBP', (value) => {
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
        onSubmit: async (values, {resetForm}) => {
            try {
                const planResponse = await createPlan(values.description);
                if (planResponse) {
                    const uploadResponse = await uploadImage(planResponse.id, values.file!); 
                    if (uploadResponse) {
                        alert('Plan created successfully');
                        resetForm()
                    }
                }
            } catch (error: any) {
                alert(error.message);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="description">Descripción</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description ? (
                    <div>{formik.errors.description}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="file">Imagen</label>
                <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                        formik.setFieldValue("file", event.currentTarget.files![0]);
                    }}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.file && formik.errors.file ? (
                    <div>{formik.errors.file}</div>
                ) : null}
            </div>

            
            <button type="submit">Crear Plan</button>
        </form>
    );
};

export default CreateTrainingPlan;
