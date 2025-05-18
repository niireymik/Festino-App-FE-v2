import { create } from 'zustand';
import { baseApi, tokenizedApi, tokenizedBaseApi } from '@/utils/api';
import { PhotoInfo, PhotoModalState, PhotoStore } from '@/types/Board.types';

export const usePhotoModalStore = create<PhotoModalState>((set) => ({
  selectedPhoto: null,
  setSelectedPhoto: (photo) => set({ selectedPhoto: photo }),
  clearSelectedPhoto: () => set({ selectedPhoto: null }),
}));

export const usePhotoStore = create<PhotoStore>()((set) => ({
  myPhotos: [],
  allPhotos: [],
  myPhotoCount: 0,
  allPhotoCount: 0,
  setMyPhotos: (photos, count) => set({ myPhotos: photos, myPhotoCount: count }),
  setAllPhotos: (photos, count) => set({ allPhotos: photos, allPhotoCount: count }),
  updatePhotoHeart: (photoId: string, heart: boolean, heartCount: number) =>
    set((state) => ({
      myPhotos: state.myPhotos.map((p) => (p.photoId === photoId ? { ...p, heart, heartCount } : p)),
      allPhotos: state.allPhotos.map((p) => (p.photoId === photoId ? { ...p, heart, heartCount } : p)),
    })),
}));

export const uploadPhotoPost = async (imageUrl: string) => {
  const mainUserId = localStorage.getItem('mainUserId');

  const response = await tokenizedApi.post('/main/event/photo', {
    mainUserId,
    imageUrl,
  });

  return response.data;
};

export const getAllPhotos = async (type: 'new' | 'heart'): Promise<PhotoInfo | null> => {
  const mainUserId = localStorage.getItem('mainUserId');

  try {
    const response = await baseApi.get(`/main/event/photo/all/${type}`, {
      params: mainUserId ? { 'main-user-id': mainUserId } : {},
    });

    const result = response?.data?.data;

    if (!result || !result.photoList) return null;

    return result;
  } catch {
    return null;
  }
};

export const getMyPhotos = async (type: 'new' | 'heart'): Promise<PhotoInfo | null> => {
  const mainUserId = localStorage.getItem('mainUserId');
  if (!mainUserId) return null;

  const response = await tokenizedBaseApi.get(`/main/event/photo/my/${type}/user/${mainUserId}`);
  let rawData = response.data;

  if (typeof rawData === 'string') {
    try {
      // 두 번째 JSON 시작 전까지 자르기 (두 번째 '{' 검색 기준)
      const firstBrace = rawData.indexOf('{');
      const secondBrace = rawData.indexOf('}{', firstBrace + 1);
      const sliceEnd = secondBrace === -1 ? rawData.length : secondBrace + 1;

      const jsonString = rawData.slice(firstBrace, sliceEnd);
      rawData = JSON.parse(jsonString);
    } catch {
      return null;
    }
  }

  const result = rawData?.data;
  if (!result || !result.photoList) return null;

  return result;
};

export const deletePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.delete('/main/event/photo', {
    data: { photoId, mainUserId },
  });

  if (!response.data.success) {
    throw new Error(response.data.message || '삭제 실패');
  }

  return response.data;
};

export const likePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.post('/main/event/photo/heart', {
    photoId,
    mainUserId,
  });

  return response.data;
};

export const unlikePhoto = async (photoId: string, mainUserId: string) => {
  const response = await tokenizedApi.delete('/main/event/photo/heart', {
    data: { photoId, mainUserId },
  });

  return response.data;
};
