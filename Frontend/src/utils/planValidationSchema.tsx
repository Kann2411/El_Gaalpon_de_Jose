import * as Yup from 'yup'

export const planValidationSchema = Yup.object().shape({
    description: Yup.string()
      .required('La descripción es obligatoria')
      .matches(/^[a-zA-Z0-9 ]*$/, 'La descripción solo puede contener letras y números'),
    file: Yup.mixed()
      .required('El archivo es obligatorio'),
  });