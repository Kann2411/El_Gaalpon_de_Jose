import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, 'Name must be between 3 and 80 characters.')
    .max(80, 'Name must be between 3 and 80 characters.')
    .required('Name is required.'),

  dni: Yup.string()
    .min(3, 'DNI must be between 3 and 8 characters.')
    .max(8, 'DNI must be between 3 and 8 characters.')
    .required('DNI is required.'),

  email: Yup.string()
    .email('Email must have a valid format.')
    .required('Email is required.'),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/,
      'Password must be between 8 and 15 characters, and include at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).'
    )
    .required('Password is required.'),

    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),

  phone: Yup.string()
    .required('Phone number is required.'),
})



 
