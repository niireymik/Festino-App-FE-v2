import { create } from 'zustand';

interface PersonalInfoState {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
  toggleIsAgreed: () => void;
}

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
  isAgreed: false,

  setIsAgreed: (value) => set({ isAgreed: value }),

  toggleIsAgreed: () => set((state) => ({ isAgreed: !state.isAgreed })),
}));
