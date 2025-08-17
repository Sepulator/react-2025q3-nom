import { countries } from '@/consts';
import { create } from 'zustand';

interface FormStore {
  isDialogOpen: boolean;
  isHookForm: boolean;
  openDialog: (type: boolean) => void;
  closeDialog: () => void;
  countries: string[];
}

export const useFormStore = create<FormStore>((set) => ({
  isDialogOpen: false,
  isHookForm: true,
  openDialog: (type: boolean) => set({ isDialogOpen: true, isHookForm: type }),
  closeDialog: () => set({ isDialogOpen: false }),
  countries,
}));
