import { useEffect } from 'react';
import { usePhotoStore } from '@/stores/events/BoardStore';
import { getAllPhotos, getMyPhotos } from '@/stores/events/BoardStore';
import { PhotoPost } from '@/types/Board.types';

const SearchPhoto: React.FC = () => {
  const { myPhotos, myPhotoCount, allPhotos, allPhotoCount, setMyPhotos, setAllPhotos } = usePhotoStore();

  useEffect(() => {
    const fetchMyPhotos = async () => {
      try {
        const { photoList, photoTotalCount } = await getMyPhotos('new');
        setMyPhotos(photoList, photoTotalCount);
      } catch (e) {
        console.error(e);
      }
    };

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
        <div className="pt-5 flex flex-col gap-5 dynamic-padding w-full justify-start">
          {/* 내 사진 */}
          <p className="text-xl font-bold">내 사진</p>
          <div
            id="user-photo"
            className="w-full flex overflow-x-scroll scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div
              className={`gap-2 ${
                myPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-rows-1 grid-flow-col'
              }`}
            >
              {myPhotos.map((photo: PhotoPost) => (
                <div
                  key={photo.photoId}
                  className="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0"
                  style={{ backgroundImage: `url(${photo.imageUrl})` }}
                >
                  <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-slate-500 opacity-50 rounded-3xl"></div>
                    <div className="relative z-10">
                      <h2 className="font-bold mb-0.5 break-keep">{photo.mainUserName}</h2>
                      <h2 className="text-2xs">❤️ {photo.heartCount}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-black" />

          {/* 업로드된 전체 사진 */}
          <p className="text-xl font-bold">업로드 된 사진</p>
          <div
            id="all-photo"
            className="w-full flex overflow-x-scroll scroll-smooth"
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div
              className={`gap-2 ${
                allPhotoCount <= 2 ? 'flex justify-start' : 'grid place-content-start grid-cols-2 grid-flow-row'
              }`}
            >
              {allPhotos.map((photo: PhotoPost) => (
                <div
                  key={photo.photoId}
                  className="dynamic-item rounded-3xl bg-no-repeat bg-cover relative shrink-0"
                  style={{ backgroundImage: `url(${photo.imageUrl})` }}
                >
                  <div className="flex flex-col justify-end text-white p-5 relative rounded-3xl dynamic-item">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-700 via-slate-500 opacity-50 rounded-3xl"></div>
                    <div className="relative z-10">
                      <h2 className="font-bold mb-0.5 break-keep">{photo.mainUserName}</h2>
                      <h2 className="text-2xs">❤️ {photo.heartCount}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPhoto;
