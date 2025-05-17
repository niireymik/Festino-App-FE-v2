export type TabType = '사진 목록' | '사진 업로드';

export interface PhotoPost {
  photoId: string;
  mainUserName: string;
  imageUrl: string;
  heartCount: number;
  createAt: string;
  heart: boolean;
}

export interface UserPhotoStore {
  userPhotoList: PhotoPost[];
  userPhotoLength: number;
  setPhotoData: (list: PhotoPost[], count: number) => void;
}
