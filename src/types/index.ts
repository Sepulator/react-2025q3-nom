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

export interface FormStore {
  isDialogOpen: boolean;
  isHookForm: boolean;
  openDialog: (type: boolean) => void;
  closeDialog: () => void;
  addFormValue: (formValue: FormValue) => void;
  countries: string[];
  formValues: FormValue[];
}
