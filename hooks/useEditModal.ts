import { create } from "zustand";

type EditModalState = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useEditModal = create<EditModalState>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
