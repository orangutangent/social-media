import { create } from "zustand";

type LoginModalState = {
  isOpen: boolean;
  setOpen: () => void;
  setClose: () => void;
};

export const useLoginModal = create<LoginModalState>((set) => ({
  isOpen: false,
  setOpen: () => set({ isOpen: true }),
  setClose: () => set({ isOpen: false }),
}));
