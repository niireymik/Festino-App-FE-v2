import { create } from "zustand";
import { api } from "@/utils/api";
import { TimetableStore } from "@/types/ClubData.types"

export const useTimetableStore = create<TimetableStore>((set) => ({
  clubData: [],
  selectedClub: null,
  getClubTimetable: async (day) => {
    try {
      const res = await api.get(`/main/club/all/date/${day}`);
      set({ clubData: res.data.showInfo });
    } catch (error) {
      console.error("getClubTimetable 실패:", error);
      set({ clubData: [] });
    }
  },
  setSelectedClub: (club) => set({ selectedClub: club }),
}));