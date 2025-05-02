import { create } from "zustand";
import { MockBoothList } from "@/mocks/boothData";
import { BoothDataState } from "@/types/Booth.types";

export const useBoothDataStore = create<BoothDataState>((set) => ({
  boothList: MockBoothList,
  selectBoothMenu: 0,
  setSelectBoothMenu: (index) => set({ selectBoothMenu: index }),
  getBoothData: (type, id) => {
    console.log(`Clicked booth: Type - ${type}, ID - ${id}`);
  },
}));