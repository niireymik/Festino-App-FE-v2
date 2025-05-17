import { tokenizedApi } from '@/utils/api';
import { useAuthStore } from '@/stores/auths/authStore';
import { create } from 'zustand';
import { UserPhotoStore } from '@/types/Board.types';
import { getCookie } from '@/utils/utils';

export const usePhotoStore = create<UserPhotoStore>()((set) => ({
  userPhotoList: [],
  userPhotoLength: 0,
  setPhotoData: (list, count) => set({ userPhotoList: list, userPhotoLength: count }),
}));

export const uploadPhotoPost = async (imageUrl: string) => {
  const { isLogin } = useAuthStore.getState();
  const mainUserId = getCookie('mainUserId');

  if (!mainUserId || !isLogin()) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await tokenizedApi.post('/main/event/photo', {
    mainUserId,
    imageUrl,
  });

  return response.data;
};

export const getUserPhotoPosts = async (type: 'new' | 'heart') => {
  const { isLogin } = useAuthStore.getState();
  const mainUserId = getCookie('mainUserId');

  if (!mainUserId || !isLogin()) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await tokenizedApi.get(`/main/event/photo/my/${type}/user/${mainUserId}`);

  if (!response.data.success) {
    throw new Error('사진 게시물 조회 실패');
  }

  const { photoList, userPhotoLength } = response.data.photoInfo;

  return {
    photoList,
    userPhotoLength,
  };
};
