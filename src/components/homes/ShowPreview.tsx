import useBaseModal from "@/stores/baseModal";

const ShowPreview: React.FC = () => {
  const { openModal } = useBaseModal();

  const handleClickInstagram = () => {
    window.open('https://www.instagram.com/tukorea_drama/', '_blank');
  };

  const openTimetableModal = () => {
    openModal("timetable");
  };

  return (
    <div className="w-full h-[160px] sm:h-[178px] bg-white rounded-3xl border-primary-900-light-16 border-1 flex justify-center select-none shadow-4xl">
      <div className="flex pt-3 w-full px-3 justify-evenly gap-1 overflow-x-auto reserve-container">
        {[1, 2].map((_, index) => (
          <div onClick={openTimetableModal} key={index} className="flex flex-col items-center cursor-pointer">
            <div className="border-2 border-primary bg-cheer-up-tino sm:bg-[length:62px_62px] bg-[length:52px_52px] bg-primary-900 bg-no-repeat bg-cover bg-center w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"></div>
            <div className="text-xs font-normal pt-2">17:00</div>
            <div className="text-primary-700 font-medium">티노</div>
          </div>
        ))}

        <div className="flex flex-col items-center cursor-pointer" onClick={handleClickInstagram}>
          <div className="border-2 border-primary bg-cover bg-center bg-talent-icon w-[86px] h-[86px] sm:w-[100px] sm:h-[100px] rounded-full"></div>
          <div className="text-primary-700 font-medium pt-6">연예인 공연</div>
        </div>
      </div>
    </div>
  );
};

export default ShowPreview;