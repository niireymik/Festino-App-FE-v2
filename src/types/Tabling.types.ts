import { BoothInfo } from './Booth.types';

export interface ReserveInfo {
  userName: string;
  phoneNum: string;
  personCount: number;
  boothId: string;
}

export interface ReservationInfo {
  reservationId: string;
  personCount: number;
  boothId: string;
  adminName: string;
  totalTeamCount: number;
  date: number;
  reservationNum: number;
  reservationType: string;
}

export interface ReservationStore {
  recentName: string;
  recentPhoneNum: string;
  reservationInfo: ReservationInfo | null;
  userName: string;
  nightBoothInfo: BoothInfo[] | null;
  openNightBoothInfo: BoothInfo[] | null;
  openNightBoothInfoLength: number;
  selectedNightBoothInfo: BoothInfo | null;
  prevReserveBoothName: string;
  reserveInfo: ReserveInfo;

  setRecentName: (name: string) => void;
  setRecentPhoneNum: (phone: string) => void;
  setSelectedNightBoothInfo: (booth: BoothInfo | null) => void;
  saveReservation: (
    payload: ReserveInfo,
    utils: { openModal: (type: string) => void; closeModal: () => void; navigate: (path: string) => void },
  ) => Promise<void>;
  getReservation: (
    payload: { userName: string; phoneNum: string },
    utils: { openModal: (type: string) => void; closeModal: () => void; navigate: (path: string) => void },
  ) => Promise<void>;
  getAllNightBooth: () => Promise<void>;
  checkDuplicateReserve: (
    phoneNum: string,
    utils: { openModal: (type: string) => void; closeModal: () => void; navigate: (path: string) => void },
  ) => Promise<void>;
}
