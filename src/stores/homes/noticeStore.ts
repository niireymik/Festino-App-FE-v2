import { create } from "zustand";
import { api } from "@/utils/api";
import { Notice, NoticeStore } from "@/types/Notice.types";

export const useNoticeStore = create<NoticeStore>((set) => ({
  mainNoticeData: null,
  noticeData: null,
  pinNotices: [],
  notices: [],
  allNotices: [],

  getMainNotice: async () => {
    try {
      const res = await api.get('/main/notice');
      set({ mainNoticeData: res.data.data });
    } catch (error) {
      console.error('getMainNotice 실패:', error);
      set({ mainNoticeData: null });
    }
  },

  getNotice: async (noticeId: string) => {
    try {
      const res = await api.get(`/main/notice/${noticeId}`);
      set({ noticeData: res.data.data });
    } catch (error) {
      console.error('getNotice 실패:', error);
      set({ noticeData: null });
    }
  },

  getAllNotice: async () => {
    try {
      const res = await api.get('/main/notice/all');
      const all = res.data.data;

      set({
        allNotices: all,
        pinNotices: all.filter((n: Notice) => n.isPin),
        notices: all.filter((n: Notice) => !n.isPin),
      });
    } catch (error) {
      console.error('getAllNotice 실패:', error);
      set({
        allNotices: [],
        pinNotices: [],
        notices: [],
      });
    }
  },
}));