import { useEffect } from 'react';
import { usePhotoStore } from '@/stores/events/BoardStore';
import { getAllPhotos, getMyPhotos } from '@/stores/events/BoardStore';
import { PhotoPost } from '@/types/Board.types';
import PhotoCard from './PhotoCard';

const SearchPhoto: React.FC = () => {
  const { myPhotos, myPhotoCount, allPhotos, allPhotoCount, setMyPhotos, setAllPhotos } = usePhotoStore();
  const mainUserId = localStorage.getItem('mainUserId');

  useEffect(() => {
    // 내가 업로드한 사진 불러오기
    const fetchMyPhotos = async () => {
      try {
        const photo = await getMyPhotos('new');

        if (!photo || !photo.photoList) {
          setMyPhotos([], 0);
        } else {
          setMyPhotos(photo.photoList, photo.photoTotalCount);
        }
      } catch {
        setMyPhotos([], 0); // 안전하게 초기화
      }
    };

    // 모든 사진 불러오기
    const fetchAllPhotos = async () => {
      try {
        const photo = await getAllPhotos('new');

        if (!photo) {
          setAllPhotos([], 0);
        } else {
          setAllPhotos(photo.photoList, photo.photoTotalCount);
        }
      } catch {
        return null;
      }
    };

    fetchMyPhotos();
    fetchAllPhotos();
  }, [mainUserId, setMyPhotos, setAllPhotos]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // mainUserId 유무 상관 없이 항상 전체 사진 갱신
        const allRes = await getAllPhotos('new');
        if (allRes) {
          setAllPhotos(allRes.photoList, allRes.photoTotalCount);
        } else {
          setAllPhotos([], 0);
        }

        // 내 사진은 mainUserId가 있는 경우만 호출
        const mainUserId = localStorage.getItem('mainUserId');
        if (mainUserId) {
          const myRes = await getMyPhotos('new');
          if (myRes) {
            setMyPhotos(myRes.photoList, myRes.photoTotalCount);
          } else {
            setMyPhotos([], 0); // 데이터가 없는 경우 초기화
          }
        }
      } catch {
        return null;
      }
    }, 5000); // 5초마다 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-screen max-w-[500px] min-w-[375px] z-0">
        <div className="pt-5 dynamic-bottom flex flex-col gap-5 dynamic-left-padding w-full justify-start">
          <p className="text-xl font-bold pl-2">내 사진</p>
          <div
            id="user-photo"
            className="w-full flex overflow-x-scroll scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            {mainUserId ? (
              myPhotoCount === 0 ? (
                // 로그인 상태, 내 게시물이 존재하지 않을 때
                <div className="w-full text-center text-primary-700">사진을 업로드 해보세요!</div>
              ) : (
                // 로그인 상태, 내 게시물 존재
                <>
                  <div
                    className={`gap-2 ${
                      myPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-rows-1 grid-flow-col'
                    }`}
                  >
                    {myPhotos
                      .filter((photo) => photo.imageUrl) // imageUrl이 존재하는 경우만 필터링
                      .map((photo: PhotoPost) => (
                        <PhotoCard key={photo.photoId} photo={photo} />
                      ))}
                  </div>
                </>
              )
            ) : (
              // 로그아웃 상태
              <div className="w-full text-center text-primary-700">로그인 후 이벤트에 참여하세요!</div>
            )}
          </div>

          <hr className="border-gray-300" />

          <p className="text-xl font-bold pl-2">모든 사진</p>
          {allPhotoCount === 0 ? (
            // 게시물이 존재하지 않을 때
            <div className="w-full text-center text-primary-700">첫 번째 이벤트 참가자가 되어보세요!</div>
          ) : (
            // 게시물 존재
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
                {allPhotos
                  .filter((photo) => photo.imageUrl) // imageUrl이 존재하는 경우만 필터링
                  .map((photo: PhotoPost) => (
                    <PhotoCard key={photo.photoId} photo={photo} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPhoto;
