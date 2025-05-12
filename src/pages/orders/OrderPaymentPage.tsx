import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import { formatPrice } from '@/utils/utils';
import MenuCard from '@/components/orders/MenuCard';
import { api } from '@/utils/api';
import { disconnectOrderSocket, connectOrderSocket } from '@/utils/orderSocket';
import useBaseModal from '@/stores/baseModal';

const CATEGORIES = [
  { label: '전체 메뉴', value: 'ALL' },
  { label: '메인 메뉴', value: 0 },
  { label: '서브 메뉴', value: 1 },
  { label: '기타 메뉴', value: 2 },
] as const;

type CategoryValue = (typeof CATEGORIES)[number]['value'];

const CATEGORY_ENDPOINT_MAP: Record<CategoryValue, string> = {
  ALL: 'all',
  0: 'main',
  1: 'sub',
  2: 'service',
};

const OrderPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();

  const {
    memberCount,
    setBoothId,
    setTableNum,
    setMenuInfo,
    menuInfo,
    handleTotalPrice,
    addOrderItem,
    userOrderList,
    totalPrice,
  } = useOrderStore();

  const { openModal } = useBaseModal();
  const [selectedCategory, setSelectedCategory] = useState<CategoryValue>('ALL');

  useEffect(() => {
    window.scrollTo(0, 0);
    const tableIndex = Number(tableNum);

    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      navigate('/error/NotFound');
      return;
    }

    setBoothId(boothId);
    setTableNum(tableIndex);
    fetchMenuByCategory('ALL');
  }, [boothId, tableNum]);

  useEffect(() => {
    handleTotalPrice();
    console.log('현재 주문한 메뉴:', userOrderList);
  }, [userOrderList]);

  useEffect(() => {
    if (!boothId || !isUUID(boothId)) return;
    const tableIndex = Number(tableNum);
    connectOrderSocket(boothId, tableIndex); // ✅ 웹소켓 연결
  }, [boothId, tableNum]);

  useEffect(() => {
    const tableIndex = Number(tableNum);

    const handleBeforeUnload = () => {
      if (boothId && !isNaN(tableIndex)) {
        disconnectOrderSocket(boothId, tableIndex);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (boothId && !isNaN(tableIndex)) {
        disconnectOrderSocket(boothId, tableIndex);
      }
    };
  }, [boothId, tableNum]);

  const fetchMenuByCategory = async (category: CategoryValue) => {
    if (!boothId) return;
    const mappedCategory = CATEGORY_ENDPOINT_MAP[category];
    const endpoint =
      mappedCategory === 'all'
        ? `/main/menu/all/booth/${boothId}`
        : `/main/menu/all/booth/${boothId}?menuType=${mappedCategory}`;

    try {
      const res = await api.get(endpoint);
      if (res.data.success && Array.isArray(res.data.menuList)) {
        setMenuInfo(res.data.menuList);
      } else {
        navigate('/error/NotFound');
      }
    } catch (err) {
      console.error('메뉴 불러오기 실패:', err);
      navigate('/error/NotFound');
    }
  };

  const handleClickReserveButton = () => {
    if (totalPrice === 0) {
      alert('메뉴를 선택해주세요.');
      return;
    }
    openModal('orderModal');
  };

  console.log(totalPrice);

  return (
    <div className="flex flex-col h-full pt-[60px]">
      <div className="fixed max-w-[500px] top-0 w-full bg-white z-10 p-4 flex items-center justify-between border-b border-gray-200">
        <button onClick={() => navigate(`/order/${boothId}/${tableNum}`)}>
          <img src="/icons/header-arrow-back.svg" alt="Back" />
        </button>
        <h1 className="text-lg font-bold">주문하기</h1>
        <div className="w-6" />
      </div>
      <div className="w-full bg-primary-700 text-white text-center py-3 flex justify-between px-3">
        {memberCount}명이 주문에 참여하고 있어요.
      </div>

      <div className="flex gap-2 px-4 pt-2 mt-6 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              setSelectedCategory(cat.value);
              fetchMenuByCategory(cat.value);
            }}
            className={`flex-1 min-w-0 basis-0 px-4 py-3 rounded-full border text-sm transition-colors
        ${
          selectedCategory === cat.value
            ? 'bg-primary-700 text-white ㅊ' // ✅ 선택된 탭: 파란 배경, 흰색 글씨, 파란 테두리
            : 'bg-white text-blue-300 border-blue-200' // ✅ 선택 안 된 탭: 흰 배경, 연한 파란 글씨, 연한 테두리
        }
      `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="p-5 mt-4 mb-5 overflow-scroll pb-[120px]">
        {menuInfo.map(
          (menu) =>
            !menu.isSoldOut && (
              <MenuCard
                key={menu.menuId}
                menu={menu}
                boothId={boothId!}
                tableNum={parseInt(tableNum!, 10)}
                totalPrice={totalPrice}
                totalCount={userOrderList.reduce((acc, cur) => acc + cur.menuCount, 0)} // ✅ 수량 총합 계산
                onCountChange={(count) => {
                  const order = {
                    menuId: menu.menuId,
                    menuName: menu.menuName,
                    menuPrice: menu.menuPrice,
                    menuCount: count,
                  };
                  addOrderItem(order);
                }}
              />
            ),
        )}
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

// ✅ helpers
const isUUID = (uuid: string): boolean => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  return regex.test(uuid);
};
