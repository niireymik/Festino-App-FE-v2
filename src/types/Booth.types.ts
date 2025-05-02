export interface CategoryItemProps {
  id: number,
  name: string,
  onClick?: (id: number) => void;
  isSelected?: boolean;
}

export interface Booth {
  boothId: string;
  boothName: string;
  adminName: string;
  adminCategory: string;
  boothIntro: string;
  boothImage: string | null;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}
export interface BoothInfo extends Omit<Booth, 'boothImage'> {
  boothImage: string[];
  instagram?: string;
  location?: string;
  menuList?: Menu[];
  totalReservationNum?: number;
}

export interface BoothDataState {
  boothList: Booth[];
  boothData: BoothInfo;
  selectBoothMenu: number;
  setSelectBoothMenu: (index: number) => void;
  getBoothData: (type: string, id: string) => Promise<void>;
}

export interface BoothStateLabelProps {
  isState: boolean;
  children: React.ReactNode;
}

export interface Menu {
  menuId: string;
  menuName: string;
  menuDescription: string;
  menuImage: string;
  menuPrice: number;
  isSoldOut: boolean;
  menuType: number;
}

export interface MenuItemProps {
  menu: Menu;
}

export interface ImageSliderProps {
  images: string[];
}
