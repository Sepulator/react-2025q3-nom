import { countries } from '@/consts';
import type { FormStore, FormValue } from '@/types';
import { create } from 'zustand';

export const useFormStore = create<FormStore>((set) => ({
  isDialogOpen: false,
  isHookForm: true,
  openDialog: (type: boolean) => set({ isDialogOpen: true, isHookForm: type }),
  closeDialog: () => set({ isDialogOpen: false }),
  addFormValue: (formValue: FormValue) => set((state) => ({ formValues: [formValue, ...state.formValues] })),
  countries,
  formValues: [],
}));
