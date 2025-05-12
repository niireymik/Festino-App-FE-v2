import { create } from 'zustand';
import { api } from '@/utils/api';

export type AccountInfo = {
  account: string;
  accountHolder: string;
  bankName: string;
};

export type OrderItem = {
  menuId: string;
  menuName: string;
  menuCount: number;
  menuPrice: number;
};

export type MenuInfo = {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImage: string;
  isSoldOut: boolean;
  menuType: number;
};

export type BoothDetailInfo = {
  adminName: string;
};

interface OrderState {
  boothId: string;
  tableNum: number;
  customTableNum: string;
  userOrderList: OrderItem[];
  menuInfo: MenuInfo[];
  totalPrice: number;
  userName: string;
  phoneNum: string;
  note: string;
  isCoupon: boolean;
  accountInfo: AccountInfo;
  recentPhoneNum: string;
  recentName: string;
  memberCount: number;
  isTossPay: boolean;
  tossPayUrl: string;
  isKakaoPay: boolean;
  kakaoPayUrl: string;

  setRecentPhoneNum: (num: string) => void;
  setRecentName: (name: string) => void;
  setUserOrderList: (list: OrderItem[]) => void;
  setMenuInfo: (menus: MenuInfo[]) => void;
  setBoothId: (id: string) => void;
  setTableNum: (num: number) => void;
  setCustomTableNum: (num: string) => void;
  setTotalPrice: (price: number) => void;
  setUserName: (name: string) => void;
  setPhoneNum: (num: string) => void;
  setNote: (note: string) => void;
  setIsCoupon: (value: boolean) => void;
  setAccountInfo: (info: AccountInfo) => void;

  resetOrderInfo: () => void;
  handleTotalPrice: () => void;
  addOrderItem: (order: OrderItem) => void;
  setMemberCount: (count: number) => void;
  getAccountInfo: () => Promise<void>;
  fetchTossPay: () => Promise<void>; // ✅ 반드시 인터페이스에도 정의!
  fetchKakaoPay: () => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  boothId: '',
  tableNum: 0,
  customTableNum: '',
  userOrderList: [],
  menuInfo: [],
  totalPrice: 0,
  userName: '',
  phoneNum: '',
  note: '',
  isCoupon: false,
  accountInfo: { account: '', accountHolder: '', bankName: '' },
  recentPhoneNum: '',
  recentName: '',
  memberCount: 1,
  isTossPay: false,
  tossPayUrl: '',
  isKakaoPay: false,
  kakaoPayUrl: '',

  setRecentPhoneNum: (num) => set({ recentPhoneNum: num }),
  setRecentName: (name) => set({ recentName: name }),
  setUserOrderList: (list) => set({ userOrderList: list }),
  setMenuInfo: (menus) => set({ menuInfo: menus }),
  setBoothId: (id) => set({ boothId: id }),
  setTableNum: (num) => set({ tableNum: num }),
  setCustomTableNum: (num) => set({ customTableNum: num }),
  setTotalPrice: (price) => set({ totalPrice: price }),
  setUserName: (name) => set({ userName: name }),
  setPhoneNum: (num) => set({ phoneNum: num }),
  setNote: (note) => set({ note }),
  setIsCoupon: (value) => set({ isCoupon: value }),
  setAccountInfo: (info) => set({ accountInfo: info }),
  setMemberCount: (count) => set({ memberCount: count }),

  resetOrderInfo: () => {
    set({ userOrderList: [], totalPrice: 0 });
  },

  handleTotalPrice: () => {
    const total = get().userOrderList.reduce((sum, item) => sum + item.menuCount * item.menuPrice, 0);
    set({ totalPrice: total });
    console.log(total);
  },

  addOrderItem: (order) => {
    const list = get().userOrderList;
    const exists = list.find((o) => o.menuId === order.menuId);
    if (order.menuCount === 0) {
      set({ userOrderList: list.filter((o) => o.menuId !== order.menuId) });
    } else if (exists) {
      set({
        userOrderList: list.map((o) => (o.menuId === order.menuId ? order : o)),
      });
    } else {
      set({ userOrderList: [...list, order] });
    }
  },
  getAccountInfo: async () => {
    const boothId = get().boothId;
    try {
      const res = await api.get('/main/booth/night/account', { params: { boothId } });

      if (res.data.success) {
        set({ accountInfo: res.data.accountInfo });
      } else {
        window.location.href = '/error/order';
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
      window.location.href = '/error/order';
    }
  },
  fetchKakaoPay: async () => {
    const boothId = get().boothId;
    try {
      const res = await api.get('/main/booth/night/kakao', {
        params: { boothId }, // ✅ isKakaoPay 제거, boothId만
      });
      if (res.data.success) {
        set({
          isKakaoPay: res.data.kakaoPayInfo.isKakaoPay,
          kakaoPayUrl: res.data.kakaoPayInfo.kakaoPay,
        });
      }
    } catch (e) {
      console.error('카카오페이 정보 조회 실패:', e);
    }
  },

  fetchTossPay: async () => {
    const boothId = get().boothId;
    try {
      const res = await api.get('/main/booth/night/toss', {
        params: { boothId }, // ✅ isTossPay 제거, boothId만
      });
      if (res.data.success) {
        set({
          isTossPay: res.data.tossPayInfo.isTossPay,
          tossPayUrl: res.data.tossPayInfo.tossPay,
        });
      }
    } catch (e) {
      console.error('토스페이 정보 조회 실패:', e);
    }
  },
}));
