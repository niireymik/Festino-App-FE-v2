import React, { useEffect, useState } from 'react';
import { formatPrice } from '@/utils/utils';
import { useOrderStore, type MenuInfo } from '@/stores/orders/orderStore';
import { sendWebSocketMessage } from '@/utils/orderSocket';

type Props = {
  menu: MenuInfo;
  onCountChange: (count: number) => void;
  boothId: string;
  tableNum: number;
  totalPrice: number;
  totalCount: number;
};

const MenuCard: React.FC<Props> = ({ menu, onCountChange, boothId, tableNum, totalPrice, totalCount }) => {
  const { handleTotalPrice } = useOrderStore();

  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const temporarilyDisableButton = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 400);
  };
  const { userOrderList } = useOrderStore();

  useEffect(() => {
    const existing = userOrderList.find((item) => item.menuId === menu.menuId);
    if (existing) {
      setCount(existing.menuCount);
    }
  }, [userOrderList, menu.menuId]);

  const handleMinus = () => {
    temporarilyDisableButton();

    const newCount = Math.max(count - 1, 0);
    setCount(newCount);
    // onCountChange(newCount);

    sendWebSocketMessage({
      type: 'MENUSUB',
      boothId,
      tableNum,
      payload: {
        menuId: menu.menuId,
        menuCount: count,
        totalPrice,
        totalCount,
      },
    });
  };
  sendWebSocketMessage({
    type: 'MENUSUB',
    boothId,
    tableNum,
    payload: {
      menuId: menu.menuId,
      menuCount: count,
      totalPrice,
      totalCount,
    },
  });

  const handlePlus = () => {
    temporarilyDisableButton();

    const newCount = count + 1;
    setCount(newCount);
    // onCountChange(newCount);

    sendWebSocketMessage({
      type: 'MENUADD',
      boothId,
      tableNum,
      payload: {
        menuId: menu.menuId,
        menuCount: count,
        totalPrice,
        totalCount,
      },
    });
  };

  const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    let numericValue = Number(inputValue);
    if (numericValue > 99) numericValue = 99;
    setCount(numericValue);
    // onCountChange(numericValue);
  };

  useEffect(() => {
    if (count) {
      onCountChange(count);
      handleTotalPrice();
    }
  }, [count]);

  return (
    <div className="flex gap-4 mb-6 border-b pb-4">
      <div
        className="w-24 h-24 rounded-xl bg-center bg-cover border"
        style={{
          backgroundImage: `url(${menu.menuImage || '/images/booth/booth-default-image.png'})`,
        }}
      />
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="font-semibold text-secondary-700">{menu.menuName}</div>
          <div className="text-sm font-light text-gray-500 mt-1">{menu.menuDescription}</div>
          <div className="text-sm font-light text-gray-500 mt-1">가격: {formatPrice(menu.menuPrice)}원</div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className={`font-semibold ${count ? 'text-secondary-700' : 'text-secondary-100'}`}>
            {formatPrice(menu.menuPrice * count)}원
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinus}
              disabled={isDisabled}
              className="w-6 h-6 flex items-center justify-center rounded-full"
            >
              <img src="/icons/orders/minus.svg" alt="minus" className="w-5 h-5" />
            </button>
            <input
              className="w-[62px] h-7 rounded-3xl border text-center focus:outline-none"
              type="text"
              value={count}
              onChange={handleCountInput}
              min="0"
              max="99"
              maxLength={2}
              placeholder="0"
              inputMode="numeric"
              pattern="\d*"
            />
            <button
              onClick={handlePlus}
              disabled={isDisabled}
              className="w-6 h-6 flex items-center justify-center rounded-full"
            >
              <img src="/icons/orders/plus.svg" alt="plus" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
