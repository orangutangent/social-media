import { create } from "zustand";

type RegisterModalState = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useRegisterModal = create<RegisterModalState>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
