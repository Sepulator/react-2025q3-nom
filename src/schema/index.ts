import * as yup from 'yup';
import { countries } from '@/consts';

const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters')
  .test('has-number', 'Password must contain at least 1 number', (val) => /\d/.test(val || ''))
  .test('has-uppercase', 'Password must contain at least 1 uppercase letter', (val) => /[A-Z]/.test(val || ''))
  .test('has-lowercase', 'Password must contain at least 1 lowercase letter', (val) => /[a-z]/.test(val || ''))
  .test('has-special', 'Password must contain at least 1 special character', (val) =>
    /[!@#$%^&*(),.?":{}|<>]/.test(val || '')
  );

const pictureSchemaControlled = yup
  .mixed<FileList>()
  .required('No files selected')
  .test('fileSize', 'File size must be less than 1MB', (val) => {
    return val && val.length > 0 && val[0].size <= 1 * 1024 * 1024;
  })
  .test('fileType', 'Only PNG and JPEG files are allowed', (val) => {
    return val && val.length > 0 && ['image/png', 'image/jpeg'].includes(val[0].type);
  });

const pictureSchemaUnControlled = yup
  .mixed<File>()
  .required('No files selected')
  .test('fileSize', 'File size must be less than 1MB', (val) => {
    return val && val.size <= 1 * 1024 * 1024;
  })
  .test('fileType', 'Only PNG and JPEG files are allowed', (val) => {
    return val && ['image/png', 'image/jpeg'].includes(val.type);
  });

const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test('starts-uppercase', 'Name must start with an uppercase letter', (val) => /^[A-Z]/.test(val || '')),
  age: yup.number().typeError('Age must be a number').min(1, 'Age cannot be negative').required(),
  email: yup.string().email().required('Type email'),
  password: passwordSchema.required('Type password'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Please select a gender').required('Please select a gender'),
  acceptTerms: yup
    .string()
    .oneOf(['on'], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
  country: yup.string().oneOf(countries, 'Please select a valid country').required('Please select a valid country'),
});

export const formSchemaUncontrolled = formSchema.shape({
  picture: pictureSchemaUnControlled,
});

export const formSchemaControlled = formSchema.shape({
  picture: pictureSchemaControlled,
});

export type FormDataControlled = yup.InferType<typeof formSchemaControlled>;
