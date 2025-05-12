export interface AuthStore {
  userId: string;
  password: string;
  isLoggedIn: boolean;
  setUserId: (id: string) => void;
  setPassword: (pw: string) => void;
  setIsLoggedIn: (value: boolean) => void;
  login: () => Promise<boolean>;
  logout: () => void;
  getNewAccessToken: () => Promise<void>;
}
