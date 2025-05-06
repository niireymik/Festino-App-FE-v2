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

  setSelectBoothCategory: (index: number) => {
    set({ selectBoothCategory: index });
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

      const [all, night, day, food, facility] = await Promise.all(
        urls.map((url) => api.get(url))
      );

      set({
        boothListAll: all.data.boothList,
        boothListNight: night.data.boothList,
        boothListDay: day.data.boothList,
        boothListFood: food.data.boothList,
        boothListFacility: facility.data.facilityList,
      });
    } catch (error) {
      console.error(`Error: ${error}, 부스 목록 받아오기 실패`, error);
    }
  },

  getBoothDetail: async (type: string, id: string) => {
    const urlType = BOOTH_TYPE_MAP[type];
  
    if (!urlType) {
      console.log('부스 타입이 존재하지 않습니다:', type);
      return;
    }
  
    try {
      const endpoint =
        urlType === 'facility'
          ? `/main/${urlType}/${id}`
          : `/main/booth/${urlType}/${id}`;
  
      const res = await api.get(endpoint);
      const boothDetail: BoothInfo =
        urlType === 'facility' ? res.data.facility : res.data.boothInfo;
  
      set({ boothDetail });
    } catch (err) {
      console.error(`부스 정보가 없습니다: ${type}`, err);
    }
  },
}));