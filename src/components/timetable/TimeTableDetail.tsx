import React from 'react';

const TimeTableDetail: React.FC = () => {
  const isShowing = true
    ? 'border-primary text-primary-700'
    : 'bg-secondary-50 border-secondary-100 text-secondary-100';

  return (
    <div
      className={`cursor-pointer flex py-5 rounded-3xl w-[170px] xs:w-[210px] sm:w-[230px] border-2 flex-col items-center gap-2.5 shadow-4xl ${isShowing}`}
    >
      <div
        className="rounded-full bg-primary-700 w-9 h-9 border-2 border-primary bg-cover bg-center"
      />
      <div className="text-center leading-none">
        <div>교내 동아리 공연</div>
        <div>' 공연자 '</div>
      </div>
      <button
        className="text-white bg-primary-700 w-[120px] h-[30px] rounded-full text-xs"
      >
        공연 정보 상세보기
      </button>
    </div>
  );
};

export default TimeTableDetail;