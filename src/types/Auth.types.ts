export interface AuthStore {
  userName: string;
  userPhoneNum: string;
  userStudentNum: string;
  verifyCode: string;
  mainUserId: string;
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  setUserName: (id: string) => void;
  setUserPhoneNum: (pw: string) => void;
  setUserStudentNum: (stnum: string) => void;
  setMainUserId: (uuid: string) => void;
  setVerifyCode: (code: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  login: () => Promise<boolean>;
  saveUserInfo: () => Promise<{ success: boolean; message: string }>;
  sendAuthorizationCode: () => Promise<{ success: boolean; message: string }>;
}
