import { countries } from '@/consts';
import type { FormValue } from '@/types';
import { create } from 'zustand';

interface FormStore {
  isDialogOpen: boolean;
  isHookForm: boolean;
  openDialog: (type: boolean) => void;
  closeDialog: () => void;
  addFormValue: (formValue: FormValue) => void;
  countries: string[];
  formValues: FormValue[];
}

export const useFormStore = create<FormStore>((set) => ({
  isDialogOpen: false,
  isHookForm: true,
  openDialog: (type: boolean) => set({ isDialogOpen: true, isHookForm: type }),
  closeDialog: () => set({ isDialogOpen: false }),
  addFormValue: (formValue: FormValue) => set((state) => ({ formValues: [formValue, ...state.formValues] })),
  countries,
  formValues: [],
}));
