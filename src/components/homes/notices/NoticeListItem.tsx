import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTICE_ID } from "@/constants";

const NoticeListItem: React.FC = () => {
  const navigate = useNavigate();
  const [isPinned] = useState(true);

  const handleClickNotice = () => {
    navigate(`/notice/${MOCK_NOTICE_ID}`);
  };

  return (
    <div
      className="w-full h-auto flex flex-row bg-white rounded-3xl border-primary-900-light-16 border justify-between items-center cursor-pointer select-none mt-5 shadow-4xl"
      onClick={handleClickNotice}
    >
      {isPinned ? (
        <div className="flex pl-4 items-center py-3 gap-[12px]">
          <div className="w-[20px] h-[20px] bg-center bg-pin-icon bg-no-repeat bg-[length:20px_20px]" />
          <div className="py-1 text-base text-primary-700 leading-tight">공지사항 제목</div>
        </div>
      ) : (
        <div className="flex flex-col pl-4 items-start py-3">
          <div className="py-1 text-base text-secondary-500 leading-tight">공지사항 제목</div>
        </div>
      )}
      <div className="flex justify-end pr-4 text-xs text-secondary-500 w-[140px]">
        3시간 전
      </div>
    </div>
  );
};

export default NoticeListItem;