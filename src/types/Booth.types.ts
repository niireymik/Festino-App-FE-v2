export interface CategoryItemProps {
  id: number,
  name: string,
  onClick?: (id: number) => void;
  isSelected?: boolean;
}

export interface Booth {
  boothId: string;
  boothName: string;
  adminCategory: string;
  boothIntro: string;
  boothImage: string | null;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface BoothDataState {
  boothList: Booth[][]; 
  selectBoothMenu: number;
  setSelectBoothMenu: (index: number) => void;
  getBoothData: (type: string, id: number) => void;
}

export interface BoothStateLabelProps {
  isState: boolean;
  children: React.ReactNode;
}

export interface BoothMenu {
  menuId: string;
  menuName: string;
  menuDescription: string;
  menuImage: string;
  menuPrice: number;
  isSoldOut: boolean;
  menuType: number;
}

export interface BoothInfo {
  boothId: string;
  boothName: string;
  adminCategory: string;
  adminName: string;
  openTime: string;
  closeTime: string;
  boothIntro: string;
  boothImage: string[];
  isOpen: boolean;
  isOrder: boolean;
  isReservation: boolean;
  totalReservationNum: number;
  markerNum: number;
  menuList: BoothMenu[];
  instagram?: string;
  location: string;
}

export interface MenuItemProps {
  menu: BoothMenu;
}

export interface ImageSliderProps {
  images: string[];
}
