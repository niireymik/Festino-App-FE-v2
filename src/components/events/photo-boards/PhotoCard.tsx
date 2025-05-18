import { usePhotoStore, usePhotoModalStore, likePhoto, unlikePhoto } from '@/stores/events/BoardStore';
import useBaseModal from '@/stores/baseModal';
import { useState } from 'react';
import { PhotoPost } from '@/types/Board.types';

interface PhotoCardProps {
  photo: PhotoPost;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [isLike, setIsLike] = useState(photo.heart);
  const [likeCount, setLikeCount] = useState(photo.heartCount);

  const { openModal } = useBaseModal();
  const { setSelectedPhoto } = usePhotoModalStore();
  const { myPhotos } = usePhotoStore();

  const mainUserId = localStorage.getItem('mainUserId');

  // 내 사진인지 판단 (photoId가 내 사진 목록에 존재하는가)
  const isUserPhoto = myPhotos.some((p) => p.photoId === photo.photoId);

  const handleClickDelete = () => {
    setSelectedPhoto(photo);
    openModal('deletePhotoModal');
  };

  const handleToggleLike = async () => {
    if (!mainUserId) {
      openModal('requireLoginModal');
      return;
    }
    if (isUserPhoto) {
      alert('자신의 게시물에는 좋아요를 할 수 없습니다!');
      return;
    }

    try {
      if (mainUserId) {
        if (isLike) {
          await unlikePhoto(photo.photoId, mainUserId);
          setIsLike(false);
          setLikeCount((prev) => prev - 1);
        } else {
          await likePhoto(photo.photoId, mainUserId);
          setIsLike(true);
          setLikeCount((prev) => prev + 1);
        }
      }
    } catch (e) {
      console.error('좋아요 처리 실패:', e);
    }
  };

  return (
    <div
      className="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0 border-1"
      style={{ backgroundImage: `url(${photo.imageUrl})` }}
      onClick={() => {
        setSelectedPhoto(photo);
        openModal('extendPhotoModal');
      }}
    >
      {isUserPhoto && (
        <button
          className="absolute top-4 right-4 z-50 w-6 h-6 bg-x-button bg-contain bg-no-repeat bg-center"
          onClick={(e) => {
            e.stopPropagation();
            handleClickDelete();
          }}
        ></button>
      )}

      <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-slate-500 opacity-50 rounded-3xl" />
        <div className="relative z-10">
          <h2 className="font-bold mb-1 break-keep">{photo.mainUserName}</h2>

          <div className="flex items-center gap-1 text-2xs">
            <button
              onClick={handleToggleLike}
              className={`w-4 h-4 ${isUserPhoto || !mainUserId ? 'cursor-not-allowed' : ''}`}
            >
              <img
                src={isLike ? '/icons/events/full-heart.svg' : '/icons/events/empty-heart.svg'}
                alt="like"
                className="w-full h-full"
              />
            </button>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
