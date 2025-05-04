import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrderStore } from '@/stores/orders/orderStore';
import OrderMainBanner from '@/components/orders/OrderMainBanner';

const OrderMainPage: React.FC = () => {
  const navigate = useNavigate();
  const { boothId, tableNum } = useParams<{ boothId: string; tableNum: string }>();
  const { customTableNum, resetOrderInfo, setBoothInfo, isUUID } = useOrderStore();

  useEffect(() => {
    window.scrollTo(0, 0);

    const tableIndex = Number(tableNum);
    if (!boothId || !isUUID(boothId) || isNaN(tableIndex)) {
      navigate('/error/NotFound');
      return;
    }

    setBoothInfo(boothId, tableIndex);
    resetOrderInfo();
  }, [boothId, tableNum]);

  const handleClickFestinoButton = () => navigate('/main');
  const handleClickOrderSearchButton = () => navigate(`/order-search/${boothId}`);
  const handleClickPayment = () => navigate(`/order-payment/${boothId}`);

  return (
    <div className="flex flex-col">
      <OrderMainBanner />
      <div className="w-full rounded-t-3xl bg-white pt-6 flex flex-col items-center -translate-y-12">
        <div className="h-11 rounded-10xl bg-primary-900-light font-semibold text-primary-900 grid place-items-center px-6">
          테이블 번호 {customTableNum}
        </div>
        <div className="py-11 flex flex-col w-full px-2 gap-y-11 h-full">
          <div className="flex flex-row justify-evenly gap-x-2">
            <button
              onClick={handleClickPayment}
              className="h-72 w-48 min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow overflow-hidden cursor-pointer"
            >
              <span className="font-jalnan2 text-2xl text-primary-900 pt-5">주문하기</span>
              <img src="/icons/orders/orderIcon.svg" alt="Order Icon" />
            </button>
            <button
              onClick={handleClickOrderSearchButton}
              className="h-72 w-48 min-w-[170px] rounded-3xl flex flex-col justify-start items-center border-2 border-primary-900-lighter gap-6 shadow cursor-pointer"
            >
              <span className="font-jalnan2 text-2xl text-primary-900 pt-5">주문조회</span>
              <img src="/icons/orders/orderSearch.svg" alt="Order Search Icon" />
            </button>
          </div>
          <div className="relative">
            <img
              src="/images/orders/tino-order-main.png"
              className="w-full h-full cursor-pointer"
              onClick={handleClickFestinoButton}
              alt="Festino Banner"
            />
            <div className="absolute flex flex-col top-2 items-end pointer-events-none xs:right-10 right-5">
              <p className="text-white font-jalnan2 text-xs pt-5">2024 한국공학대학교 축제의 모든 것을 한눈에!</p>
              <h2 className="bg-gradient-to-t from-white/20 to-white text-transparent bg-clip-text font-jalnan2 text-2xl">
                ‘한국공대 축제’
              </h2>
              <button className="border-2 border-white w-[155px] h-[26px] text-white font-bold text-xs rounded-full mt-1">
                페스티노 사이트 바로가기 -&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMainPage;
