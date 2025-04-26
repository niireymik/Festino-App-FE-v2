import { BoothDataState } from '@/types/Booth.types';
import { create } from 'zustand';

export const useBoothDataStore = create<BoothDataState>((set) => ({
  selectBoothMenu: 0,
  setSelectBoothMenu: (id) => set({ selectBoothMenu: id }),
}));
