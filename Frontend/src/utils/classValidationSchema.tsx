import * as Yup from 'yup';

export const classValidationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    intensity: Yup.string().required('La intensidad es requerida'),
    capacity: Yup.number()
        .required('La capacidad es requerida')
        .min(0, 'La capacidad no puede ser menor que 0')
        .max(20, 'La capacidad no puede ser mayor que 20')
        .integer('La capacidad debe ser un número entero'),
    status: Yup.string().oneOf(['Active', 'Finished', 'Canceled'], 'Estado no válido'),
    image: Yup.string().url('URL de imagen no válida').required('La imagen es requerida'),
    description: Yup.string().required('La descripción es requerida'),
    duration: Yup.string().required('La duración es requerida'),
    day: Yup.string().required('El día es requerido'),
    starttime: Yup.string().required('La hora de inicio es requerida'),
    endtime: Yup.string().required('La hora de fin es requerida'),
});
