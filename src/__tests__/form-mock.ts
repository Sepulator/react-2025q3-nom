import type { FormStore, FormValue } from '@/types';
import { vi } from 'vitest';

export const mockFormValue1: FormValue = {
  name: 'John Doe',
  age: 25,
  email: 'john@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!',
  gender: 'female',
  acceptTerms: 'on',
  country: 'United States',
  picture: 'data:image/png;base64,mock',
};

export const mockFormValue2: FormValue = {
  name: 'Not John Doe',
  age: 52,
  email: 'not.john@example.com',
  password: 'notPassword123!',
  confirmPassword: 'notPassword123!',
  gender: 'male',
  acceptTerms: 'on',
  country: 'Germany',
  picture: 'data:image/png;base64,mock',
};

export const mockStore: FormStore = {
  countries: ['United States', 'Canada', 'Germany'],
  addFormValue: vi.fn(),
  closeDialog: vi.fn(),
  openDialog: vi.fn(),
  formValues: [],
  isDialogOpen: false,
  isHookForm: false,
};
