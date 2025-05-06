import useBaseModal from '@/stores/baseModal';

const TimetableModal: React.FC = () => {
  const { closeModal } = useBaseModal();

  return (
    <div
      className="relative pb-7 col-start-2 row-start-2 dynamic-width h-auto bg-white rounded-2xl flex flex-col items-center select-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-full flex justify-between px-5 pt-5">
        <div className="w-[20px] h-[20px]" />
        <div className="text-xs text-primary-700 rounded-full w-[80px] h-[22px] flex justify-center items-center border-2 border-primary font-medium">
          교내 동아리
        </div>
        <div
          className="w-[20px] h-[20px] bg-x-button bg-center bg-no-repeat bg-[length:20px_20px] cursor-pointer"
          onClick={closeModal}
        />
      </div>

      <div className="pb-2 pt-4 flex justify-center">
        <div
          className="border-2 border-primary bg-cover bg-center w-[120px] h-[120px] rounded-full"
        />
      </div>

      <div className="text-secondary-700 font-medium pb-2">티노</div>

      <div className="text-secondary-500 text-xs flex flex-col items-center font-medium pb-4 leading-tight whitespace-pre-wrap text-center">
        <div className="px-4 xs:px-8">아주 귀여운 한국 공학대학교 마스코트입니다.</div>
      </div>

      <div
        className="text-xs text-secondary-500 rounded-full w-[122px] h-[26px] flex items-center justify-center bg-tag gap-1 cursor-pointer"
      >
        <div className="w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]" />
        <div>@tukorea</div>
      </div>
    </div>
  );
};

export default TimetableModal;