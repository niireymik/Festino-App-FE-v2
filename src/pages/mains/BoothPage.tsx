import BoothItem from "@/components/booths/BoothItem";
import BoothMap from "@/components/booths/BoothMap";
import CategoryItem from "@/components/booths/CategoryItem";
import { BOOTH_CATEGORY } from "@/constants";
import { useBoothStore } from "@/stores/booths/boothStore";
import React, { useEffect, useCallback } from "react";

const BoothPage: React.FC = () => {
  const { boothList, selectBoothMenu, setSelectBoothMenu } = useBoothStore();

  const handleScrollToSelectedCategory = useCallback(() => {
    const container = document.getElementById('category-container');
    const targetItem = document.getElementById(`category-item-${selectBoothMenu}`);
  
    if (container && targetItem) {
      const scrollLeft = targetItem.offsetLeft - container.clientWidth / 2 + targetItem.clientWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [selectBoothMenu]);
  
  useEffect(() => {
    handleScrollToSelectedCategory();
  }, [handleScrollToSelectedCategory]);

  return (
    <>
      {/* 배너 */}
      <div className="relative">
        <div className="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-banner bg-no-repeat bg-cover z-1">
          <div className="absolute w-auto h-auto top-[60px] dynamic-padding sm:top-[72px]">
            <div className="bg-gradient-to-b from-white from-50% to-primary-300 bg-clip-text text-transparent font-jalnan2 text-md xs:text-md sm:text-[19px]">
              티노와 함께
            </div>
            <div className="bg-gradient-to-b from-white from-50% to-primary-300 bg-clip-text text-transparent font-jalnan2 text-2xl xs:text-2xl sm:text-3xl">
              축제 부스 알아보기
            </div>
          </div>
        </div>
        <div className="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
      </div>

      {/* 부스 지도 */}
      <BoothMap />

      {/* 부스 카테고리 */}
      <div
        id="category-container"
        className="w-full overflow-x-auto flex scrollbar-hide booth-category-container-padding"
      >
        {BOOTH_CATEGORY.map((item) => (
          <CategoryItem
            key={item.id}
            id={item.id}
            name={item.name}
            onClick={(id) => setSelectBoothMenu(id)}
            isSelected={selectBoothMenu === item.id}
          />
        ))}
      </div>

      {/* 부스 정보 목록 */}
      <BoothItem />
    </>
  );
};

export default BoothPage;