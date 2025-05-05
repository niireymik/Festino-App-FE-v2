import React, { useRef, useState, useEffect } from 'react';
import Reservation from './Reservation';
import SearchReservation from './SearchReservation';

type TabType = '예약하기' | '예약조회';

const SLIDE_LIMIT = 100;

const TablingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('예약하기');
  const sliderContainer = useRef<HTMLDivElement>(null);
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  const toggleTab = (type: TabType) => {
    setActiveTab(type);
    const percentage = type === '예약하기' ? 0 : -SLIDE_LIMIT;
    moveSlider(percentage);
  };

  const moveSlider = (percentage: number) => {
    setCurrentPosition(percentage);
    if (sliderContainer.current) {
      sliderContainer.current.style.transform = `translateX(${percentage}%)`;
    }
  };

  useEffect(() => {}, [activeTab]);

  return (
    <div className="relative">
      <div className="dynamic-padding mt-[-20px] pt-[28px] h-auto w-full rounded-t-2.5xl bg-white z-50 absolute">
        <div className="flex gap-[30px]">
          {(['예약하기', '예약조회'] as const).map((tab) => (
            <div
              key={tab}
              className="w-[86px] h-[32px] flex flex-col items-center justify-between cursor-pointer relative"
              onClick={() => toggleTab(tab)}
            >
              <div className={`text-xl ${activeTab === tab ? 'font-bold' : 'text-secondary-300'}`}>{tab}</div>
              {activeTab === tab && <div className="w-[86px] h-1 rounded-full bg-primary-900 absolute top-8"></div>}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-transform duration-500 ease ${
          currentPosition === 0 ? 'translate-x-0' : '-translate-x-full'
        }`}
        ref={sliderContainer}
      >
        <div className="flex flex-row w-[200%]">
          <Reservation />
          <SearchReservation />
        </div>
      </div>
    </div>
  );
};

export default TablingTabs;
