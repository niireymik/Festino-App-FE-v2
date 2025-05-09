import { create } from "zustand";
import { api } from "@/utils/api";

export interface MusicItem {
  artist: string;
  title: string;
  performer: string;
}

export interface ClubData {
  clubId: string;
  performer: string;
  showDate: string;
  showStartTime: string;
  showEndTime: string;
  clubImage: string;
  clubDescription: string;
  instagram: string;
  musicList: MusicItem[];
  isShowing: boolean;
}

interface TimetableStore {
  clubData: ClubData[];
  getClubTimetable: (day: number) => Promise<void>;
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  clubData: [],

  getClubTimetable: async (day) => {
    try {
      const res = await api.get(`/main/club/all/date/${day}`);
      set({ clubData: res.data.showInfo });
    } catch (error) {
      console.error("getClubTimetable 실패:", error);
      set({ clubData: [] });
    }
  },
}));