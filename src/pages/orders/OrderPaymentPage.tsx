import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import MenuItem from '@/components/orders/Menus';
import { formatPrice } from '@/utils/utils';
import { useBaseModal } from '@/stores/baseModal';

const CATEGORIES = ['전체', 'MAIN', 'SUB', 'CALLSERVICE'];

const OrderPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();
  const { getMenuAll, isUUID, setBoothInfo, menuInfo, totalPrice } = useOrderStore();
  const { openModal } = useBaseModal();
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    window.scrollTo(0, 0);
    const tableIndex = Number(tableNum);
    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      navigate('/error/NotFound');
      return;
    }
    setBoothInfo(boothId, tableIndex);
    getMenuAll(boothId);
  }, [boothId, tableNum]);

  const handleClickReserveButton = () => {
    if (totalPrice === 0) return;
    openModal('orderModal');
  };

  const getFilteredMenus = () => {
    if (selectedCategory === '전체') return menuInfo;
    return menuInfo.filter((menu) => menu.menuType === selectedCategory);
  };

  return (
    <div className="flex flex-col h-full pt-[60px]">
      <div className="fixed top-0 w-full bg-white z-10 p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate('/order-mainpage')}>
          <img src="/icons/common/back.svg" alt="Back" />
        </button>
        <h1 className="text-lg font-bold">주문하기</h1>
        <div className="w-6" />
      </div>
      <div className="flex gap-2 px-4 pt-2 mt-[60px] overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-500'
            }`}
          >
            {cat === 'MAIN'
              ? '메인 메뉴'
              : cat === 'SUB'
                ? '서브 메뉴'
                : cat === 'CALLSERVICE'
                  ? '기타 메뉴'
                  : '전체 메뉴'}
          </button>
        ))}
      </div>

      <div className="p-5 mb-5 overflow-scroll pb-[120px]">
        {getFilteredMenus().map((menu, index) => (!menu.isSoldOut ? <MenuItem key={index} menu={menu} /> : null))}
      </div>

      <div className="w-full max-w-[500px] shadow-xs rounded-t-3xl fixed bottom-0 bg-white flex justify-center px-[20px] py-[30px]">
        <div
          className={`flex items-center justify-center w-full h-[60px] rounded-full text-white font-extrabold cursor-pointer ${
            totalPrice === 0 ? 'bg-secondary-100' : 'bg-primary-700'
          }`}
          onClick={handleClickReserveButton}
        >
          {formatPrice(totalPrice)}원 • 주문하기
        </div>
      </div>
    </div>
  );
};

export default OrderPaymentPage;
