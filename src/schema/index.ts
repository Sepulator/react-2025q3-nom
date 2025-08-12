import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((val) => /\d/.test(val), 'Password must contain at least 1 number')
  .refine((val) => /[A-Z]/.test(val), 'Password must contain at least 1 uppercase letter')
  .refine((val) => /[a-z]/.test(val), 'Password must contain at least 1 lowercase letter')
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), 'Password must contain at least 1 special character');

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((val) => /^[A-Z]/.test(val), 'Name must start with an uppercase letter'),
    age: z.number({ error: 'Age must be a number' }).min(1, 'Age cannot be negative'),
    email: z.email(),
    password: passwordSchema,
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female', 'other'], { error: 'Please select a gender' }),
    acceptTerms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
    picture: z
      .instanceof(FileList)
      .refine((list) => list.length > 0, 'No files selected')
      .refine((list) => list.length && list[0].size <= 1 * 1024 * 1024, 'File size must be less than 1MB')
      .refine(
        (list) => list.length && ['image/png', 'image/jpeg'].includes(list[0].type),
        'Only PNG and JPEG files are allowed'
      ),
    country: z.string().min(1, 'Please select a country'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;

export const getPasswordStrength = (password: string): number => {
  let strength = 0;
  if (/\d/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  return strength;
};
