import useBaseModal from '@/stores/baseModal';

const DeletePhotoModal: React.FC = () => {
  const { closeModal } = useBaseModal();

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">정말로 이미지를 삭제하시겠습니까?</p>
          <p className="text-secondary-500">삭제한 사진은 다시 복구할 수 없습니다.</p>
        </div>
        <div className="flex">
          <button
            className="w-1/2 h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
            onClick={() => closeModal()}
          >
            돌아가기
          </button>
          <button
            className="w-1/2 h-12 bg-primary-900 rounded-3xl text-white font-semibold text-xl"
            onClick={() => closeModal()}
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
};

export default DeletePhotoModal;
