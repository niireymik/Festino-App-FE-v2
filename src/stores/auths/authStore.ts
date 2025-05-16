import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api, baseApi } from '@/utils/api';
import { AuthStore } from '@/types/Auth.types';
import { formatPhoneNum } from '@/utils/utils';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      userName: '',
      userPhoneNum: '',
      userStudentNum: '',
      mainUserId: '',
      verifyCode: '',
      isLogin: false,
      accessToken: '',
      refreshToken: '',

      setUserName: (id) => set({ userName: id }),
      setUserPhoneNum: (pw) => set({ userPhoneNum: pw }),
      setUserStudentNum: (stnum) => set({ userStudentNum: stnum }),
      setVerifyCode: (code) => set({ verifyCode: code }),
      setIsLogin: (value) => set({ isLogin: value }),
      setMainUserId: (uuid) => set({ mainUserId: uuid }),

      login: async () => {
        const { userName, userPhoneNum } = get();

        try {
          const response = await api.get('/main/user', {
            params: {
              'main-user-name': userName,
              'phone-num': formatPhoneNum(userPhoneNum),
            },
          });

          const isSuccess = response.data.success;
          const mainUserId = response.data.mainUserId;

          const accessToken = response.headers['access-token'];
          const refreshToken = response.headers['refresh-token'];

          console.log('헤더 access-token:', response.headers['access-token']);
          console.log('헤더 refresh-token:', response.headers['refresh-token']);

          set({ accessToken, refreshToken, mainUserId, isLogin: isSuccess });

          return true;
        } catch (e) {
          console.error('Login failed', e);
          set({ isLogin: false });
          return false;
        }
      },

      saveUserInfo: async () => {
        const { userName, userPhoneNum, userStudentNum, verifyCode } = get();

        try {
          const response = await baseApi.post('main/user', {
            mainUserName: userName,
            phoneNum: formatPhoneNum(userPhoneNum),
            studentNum: userStudentNum,
            authorizationCode: verifyCode,
          });

          const { success, message, mainUserId } = response.data;

          if (success) {
            set({ mainUserId, isLogin: true });
          }

          return { success, message };
        } catch (e) {
          console.error('Register failed', e);
          return { success: false, message: '회원가입 중 오류가 발생했습니다.' };
        }
      },

      sendAuthorizationCode: async () => {
        const { userName, userPhoneNum, userStudentNum, verifyCode } = get();

        try {
          const response = await baseApi.post('/main/user/authorization', {
            mainUserName: userName,
            phoneNum: formatPhoneNum(userPhoneNum),
            studentNum: userStudentNum,
            authorizationCode: verifyCode,
          });

          const { success, message, mainUserId } = response.data;

          if (success && mainUserId) {
            set({ mainUserId });
          }

          return { success, message };
        } catch (e) {
          console.error('Authorization code send failed', e);
          return { success: false, message: '인증번호 전송 중 오류가 발생했습니다.' };
        }
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        mainUserId: state.mainUserId,
      }),
    },
  ),
);
