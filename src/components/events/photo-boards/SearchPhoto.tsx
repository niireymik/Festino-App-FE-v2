import { useEffect } from 'react';
import { usePhotoStore } from '@/stores/events/BoardStore';
import { getAllPhotos, getMyPhotos } from '@/stores/events/BoardStore';
import { PhotoPost } from '@/types/Board.types';
import PhotoCard from './PhotoCard';

const SearchPhoto: React.FC = () => {
  const { myPhotos, myPhotoCount, allPhotos, allPhotoCount, setMyPhotos, setAllPhotos } = usePhotoStore();

  useEffect(() => {
    // 내가 업로드한 사진 불러오기
    const fetchMyPhotos = async () => {
      try {
        const { photoList, photoTotalCount } = await getMyPhotos('new');
        setMyPhotos(photoList, photoTotalCount);
        console.log(myPhotos)
      } catch (e) {
        console.error(e);
      }
    };

    // 모든 사진 불러오기
    const fetchAllPhotos = async () => {
      try {
        const { photoList, photoTotalCount } = await getAllPhotos('new');
        setAllPhotos(photoList, photoTotalCount);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMyPhotos();
    fetchAllPhotos();
  }, [setMyPhotos, setAllPhotos]);

  return (
    <div className="flex flex-col">
      <div className="w-screen max-w-[500px] min-w-[375px] z-0">
        <div className="pt-5 dynamic-bottom flex flex-col gap-5 dynamic-padding w-full justify-start">
          <p className="text-xl font-bold pl-2">내 사진</p>
          <div
            id="user-photo"
            className="w-full flex overflow-x-scroll scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            {myPhotoCount < 0 ? (
              <div>사진을 업로드 해보세요!</div>
            ) : (
              <>
                <div
                  className={`gap-2 ${
                    myPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-rows-1 grid-flow-col'
                  }`}
                >
                  {myPhotos.map((photo: PhotoPost) => (
                    <PhotoCard key={photo.photoId} photo={photo} isUserPhoto={true} />
                  ))}
                </div>
              </>
            )}
          </div>

          <hr className="border-gray-300" />

          <p className="text-xl font-bold pl-2">모든 사진</p>
          <div
            id="all-photo"
            className="w-full flex overflow-x-scroll scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div
              className={`gap-x-2 gap-y-4 ${
                allPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-cols-2 grid-flow-row'
              }`}
            >
              {allPhotos.map((photo: PhotoPost) => (
                <PhotoCard key={photo.photoId} photo={photo} isUserPhoto={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPhoto;
