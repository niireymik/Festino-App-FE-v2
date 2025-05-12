const TablingBanner: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="w-full min-h-[231px] dynamic-tino-height bg-tabling-banner bg-cover bg-right-bottom bg-no-repeat relative">
          <div className="absolute w-auto h-auto top-[26.65%] dynamic-padding">
            <div className="font-jalnan2 text-xs text-white">예약으로 더 즐거운 축제</div>
            <div className="font-jalnan2 text-3xl bg-gradient-to-t from-white-opacity from-20% to-white text-transparent to-100% bg-clip-text">
              테이블링 시스템
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TablingBanner;
