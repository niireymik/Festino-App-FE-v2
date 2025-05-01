import { create } from "zustand";
import { mockBoothList } from "@/mocks/boothData";
import { BoothDataState } from "@/types/Booth.types";

export const useBoothDataStore = create<BoothDataState>((set) => ({
  boothList: mockBoothList,
  selectBoothMenu: 0,
  setSelectBoothMenu: (index) => set({ selectBoothMenu: index }),
  getBoothData: (type, id) => {
    console.log(`Clicked booth: Type - ${type}, ID - ${id}`);
  },
}));