export interface FormValue {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  acceptTerms: 'on';
  country: string;
  picture: string;
}
