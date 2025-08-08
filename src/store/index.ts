import { create } from 'zustand';

interface FormStore {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  isDialogOpen: false,
  openDialog: () => set({ isDialogOpen: true }),
  closeDialog: () => set({ isDialogOpen: false }),
}));
