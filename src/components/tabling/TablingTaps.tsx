import Reservation from './Reservation';
import SearchReservation from './SearchReservation';

const TablingTaps: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="dynamic-padding mt-[13px] h-auto w-full rounded-3xl bg-inherit z-50 absolute">
          <div className="flex gap-[30px]">
            <div className="w-[86px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative">
              <div className="text-xl">예약하기</div>
            </div>
            <div className="w-[86px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative">
              <div className="text-xl">예약조회</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-[200%]">
          <Reservation />
          <SearchReservation />
        </div>
      </div>
    </>
  );
};

export default TablingTaps;
