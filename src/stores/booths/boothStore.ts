import { create } from 'zustand';
import { api } from '@/utils/api';
import { BoothInfo, BoothStore } from '@/types/Booth.types';
import { BOOTH_TYPE_MAP } from '@/constants';

export const useBoothStore = create<BoothStore>((set) => ({
  boothListAll: [],
  boothListNight: [],
  boothListDay: [],
  boothListFood:[],
  boothListFacility:[],
  boothDetail: null,
  selectBoothCategory: 0,
  isTicketBooth: false,

  init: () => {
    set({
      selectBoothCategory: 0,
      isTicketBooth: false
    })
  },

  setSelectBoothCategory: (index: number | undefined) => {
    if(index === undefined) {
      set({ 
        selectBoothCategory: 4,
        isTicketBooth: true
      })
    } else {
      set({ 
        selectBoothCategory: index,
        isTicketBooth: false
      });
    }
  },

  getBoothList: async () => {
    try {
      const urls = [
        '/main/booth/all',
        '/main/booth/night/all',
        '/main/booth/day/all',
        '/main/booth/food/all',
        '/main/facility/all',
      ];
  
      const results = await Promise.allSettled(
        urls.map((url) => api.get(url))
      );
  
      const getData = (index: number) => {
        const result = results[index];
        return result.status === 'fulfilled' ? result.value.data.data : [];
      };
  
      set({
        boothListAll: getData(0),
        boothListNight: getData(1),
        boothListDay: getData(2),
        boothListFood: getData(3),
        boothListFacility: getData(4),
      });
  
      results.forEach((result, idx) => {
        if (result.status === 'rejected') {
          console.warn(`Request failed at index ${idx}:`, result.reason);
        }
      });
    } catch (error) {
      console.error(`Unexpected error during booth list fetch:`, error);
    }
  },  

  getBoothDetail: async (type: string, id: string) => {
    const urlType = BOOTH_TYPE_MAP[type];

    if (!urlType) return;

    try {
      const endpoint =
        urlType === 'facility'
          ? `/main/${urlType}/${id}`
          : `/main/booth/${urlType}/${id}`;

      const res = await api.get(endpoint);
      const boothDetail: BoothInfo = res.data.data;

      set({ boothDetail });
      return boothDetail;
    } catch (err) {
      console.error(`부스 정보가 없습니다: ${type}`, err);
      return;
    }
  },
}));