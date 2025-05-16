import { tokenizedApi } from '@/utils/api';
import { useAuthStore } from '@/stores/auths/authStore';

export const uploadPhotoPost = async (imageUrl: string) => {
  const { mainUserId, isLogin } = useAuthStore.getState();

  if (!mainUserId || !isLogin) {
    throw new Error('로그인이 필요합니다.');
  }

  const response = await tokenizedApi.post('/main/event/phot', {
    mainUserId,
    imageUrl,
  });

  return response.data;
};
