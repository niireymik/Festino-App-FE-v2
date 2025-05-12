import { create } from 'zustand';
import { api, tokenizedBaseApi, tokenizedApi } from '@/utils/api';
import { AuthStore } from '@/types/Auth.types';
import useBaseModal from '../baseModal';

export const useAuthStore = create<AuthStore>((set, get) => ({
  userId: '',
  password: '',
  isLoggedIn: false,

  setUserId: (id) => set({ userId: id }),
  setPassword: (pw) => set({ password: pw }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  login: async () => {
    try {
      const { userId, password } = get();
      await api.post('/main/auth/login', {
        userId,
        password,
      });

      set({ isLoggedIn: true });
      return true;
    } catch (e) {
      console.error('Login failed', e);
      set({ isLoggedIn: false });
      return false;
    }
  },

  getNewAccessToken: async () => {
    await (async () => {
      try {
        const response = await api.post('/main/auth/refresh'); // refresh 토큰은 쿠키로 보내는 게 일반적
        const newAccessToken = response.data.accessToken;

        tokenizedBaseApi.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        set({ isLoggedIn: true });

        console.log('Access token 갱신 성공');
      } catch (error) {
        console.error('Access token 갱신 실패', error);
        alert('로그인 정보가 만료되었습니다. 다시 로그인을 진행해주세요.');

        const { openModal } = useBaseModal.getState();
        openModal('loginModal');
        set({ userId: '', password: '', isLoggedIn: false });
      }
    });
  },

  logout: async () => {
    try {
      await tokenizedApi.post('/main/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      set({ userId: '', password: '', isLoggedIn: false });
    }
  },
}));
