import { create } from 'zustand';
import { api, baseApi } from '@/utils/api';
import { AuthStore } from '@/types/Auth.types';

export const useAuthStore = create<AuthStore>((set, get) => ({
  userName: '',
  userPhoneNum: '',
  userStudentNum: '',
  mainUserId: '',
  verifyCode: '',
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',

  setUserName: (id) => set({ userName: id }),
  setUserPhoneNum: (pw) => set({ userPhoneNum: pw }),
  setUserStudentNum: (stnum) => set({ userStudentNum: stnum }),
  setVerifyCode: (code) => set({ verifyCode: code }),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  setMainUserId: (uuid) => set({ mainUserId: uuid }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),

  login: async () => {
    const { userName, userPhoneNum, setAccessToken, setRefreshToken } = get();

    try {
      const response = await api.get('/main/user', {
        params: {
          'main-user-name': userName,
          'phone-num': userPhoneNum,
        },
      });

      const isSuccess = response.data.success;
      const mainUserId = response.data.mainUserId;

      const accessToken = response.headers['access-token'];
      const refreshToken = response.headers['refresh-token'];

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      set({ mainUserId: mainUserId, isLoggedIn: isSuccess });

      return true;
    } catch (e) {
      console.error('Login failed', e);
      set({ isLoggedIn: false });
      return false;
    }
  },

  saveUserInfo: async () => {
    const { userName, userPhoneNum, userStudentNum, verifyCode } = get();

    try {
      const response = await baseApi.post('main/user', {
        mainUserName: userName,
        phoneNum: userPhoneNum,
        studentNum: userStudentNum,
        authorizationCode: verifyCode,
      });

      const { success, message, mainUserId } = response.data;

      if (success) {
        set({ mainUserId, isLoggedIn: true });
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
        phoneNum: userPhoneNum,
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
}));
