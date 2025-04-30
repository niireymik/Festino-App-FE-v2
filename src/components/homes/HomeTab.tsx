import DateSelector from "./DateSelector";
import SeeMore from "./SeeMore";
import ShowPreview from "./ShowPreview";
import SlideBanner from "./SlideBanner";
import { useNavigate } from 'react-router-dom';
import { TABS, MOCK_NOTICE_ID } from '@/constants';

const HomeTab: React.FC = () => {
  const navigate = useNavigate();

  const handleClickNotice = () => {
    navigate(`/notices/${MOCK_NOTICE_ID}`);
  };

  return (
    <div>
      <DateSelector></DateSelector>
      <SeeMore componentName={TABS.TIME_TABLE} />
      <div className="px-5 pb-4">
        <ShowPreview />
      </div>
      <SeeMore componentName={TABS.NOTICE} />
      <div className="px-5">
        <div
          className="py-3 select-none px-4 rounded-2xl border-primary-900-light-16 border-1 shadow-4xl flex justify-between items-center cursor-pointer"
          onClick={() => handleClickNotice()}
        >
          <div className="flex">
            <div className="w-[57px] text-secondary-700 text-xs font-medium">Festino</div>
            <div className="text-secondary-500 text-xs font-normal">
              공지사항 제목
            </div>
          </div>
          <div className="text-secondary-700 text-2xs font-normal">
            10분 전
          </div>
        </div>
      </div>
      <div className="px-5 pt-5 pb-20">
        <SlideBanner />
      </div>
    </div>
  );
};

export default HomeTab;