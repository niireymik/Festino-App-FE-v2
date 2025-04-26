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