import { create } from 'zustand';
import { api } from '@/utils/api';
import { Booth, BoothInfo } from '@/types/Booth.types';

export interface BoothDataState {
  boothList: Booth[];
  boothData: BoothInfo | null;
  selectBoothMenu: number;
  setSelectBoothMenu: (index: number) => void;
  getBoothData: (type: string, id: string) => Promise<void>;
}

export const useBoothStore = create<BoothDataState>((set) => ({
  boothList: [],
  boothData: null,
  selectBoothMenu: 0,

  setSelectBoothMenu: (index: number) => {
    set({ selectBoothMenu: index });
  },

  getBoothData: async (type: string, id: string) => {
    let urlType = '';
    switch (type) {
      case '야간부스':
        urlType = 'night';
        break;
      case '주간부스':
        urlType = 'day';
        break;
      case '푸드트럭':
        urlType = 'food';
        break;
      case '편의시설':
        urlType = 'facility';
        break;
      default:
        console.warn('Unknown booth type:', type);
        return;
    }

    try {
      const endpoint =
        urlType === 'facility'
          ? `/main/${urlType}/${id}`
          : `/main/booth/${urlType}/${id}`;

      const res = await api.get(endpoint);
      const boothData: BoothInfo =
        urlType === 'facility' ? res.data.facility : res.data.boothInfo;

      set({ boothData });
    } catch (err) {
      console.error(`Failed to fetch booth data (${type})`, err);
    }
  },
}));