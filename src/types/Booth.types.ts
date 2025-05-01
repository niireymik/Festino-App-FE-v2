export interface CategoryItemProps {
  id: number,
  name: string,
  onClick?: (id: number) => void;
  isSelected?: boolean;
}

export interface BoothDataState {
  selectBoothMenu: number;
  setSelectBoothMenu: (id: number) => void;
}

export interface Booth {
  adminCategory: string,
  boothId: number,
  boothIntro: string,
  boothName: string,
  boothImage: string | null,
  isOpen: boolean,
  openTime: string,
  closeTime: string,
}

export interface BoothDataState {
  boothList: (Booth[] | "")[];
  selectBoothMenu: number;
  setSelectBoothMenu: (index: number) => void;
  getBoothData: (type: string, id: number) => void;
}

export interface BoothStateLabelProps {
  isState: boolean;
  children: React.ReactNode;
}