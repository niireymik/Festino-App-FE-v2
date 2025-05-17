import { create } from 'zustand';
import { api, baseApi } from '@/utils/api';
import { AuthStore } from '@/types/Auth.types';
import { formatPhoneNum, getCookie, removeCookie } from '@/utils/utils';
import { setCookie } from '@/utils/utils';

export const useAuthStore = create<AuthStore>()((set, get) => ({
  userName: '',
  userPhoneNum: '',
  userStudentNum: '',
  mainUserId: '',
  verifyCode: '',
  accessToken: '',
  refreshToken: '',

  setUserName: (id) => set({ userName: id }),
  setUserPhoneNum: (pw) => set({ userPhoneNum: pw }),
  setUserStudentNum: (stnum) => set({ userStudentNum: stnum }),
  setVerifyCode: (code) => set({ verifyCode: code }),
  setMainUserId: (uuid) => set({ mainUserId: uuid }),

  isLogin: () => {
    return Boolean(getCookie('accessToken'));
  },

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
      const mainUserId = response.data.data;

      const accessToken = response.headers['access-token'];
      const refreshToken = response.headers['refresh-token'];

      if (accessToken) setCookie('accessToken', accessToken);
      if (refreshToken) setCookie('refreshToken', refreshToken);

      set({ accessToken, refreshToken, mainUserId });

      localStorage.setItem('mainUserId', mainUserId);
      localStorage.setItem('userName', userName);

      return isSuccess;
    } catch (e) {
      console.error('Login failed', e);
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
        set({ mainUserId });
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

  logout: () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('mainUserId');

    set({
      userName: '',
      userPhoneNum: '',
      userStudentNum: '',
      mainUserId: '',
      verifyCode: '',
      accessToken: '',
      refreshToken: '',
    });
  },
}));
