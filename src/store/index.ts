import { countries } from '@/consts';
import { create } from 'zustand';

interface FormStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  countries: string[];
}

export const useFormStore = create<FormStore>((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
  countries,
}));
