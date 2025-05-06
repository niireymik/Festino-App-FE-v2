import React, { useState, useEffect } from 'react';
import { formatPrice } from '@/utils/utils';
import { useOrderStore } from '@/stores/orders/orderStore';

interface Menu {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImage: string;
  menuType: number;
}

interface MenuItemProps {
  menu: Menu;
}

const MenuItem: React.FC<MenuItemProps> = ({ menu }) => {
  const [menuNum, setMenuNum] = useState(0);
  const menuUnitPrice = menu.menuPrice;
  const menuType = menu.menuType === 0 ? '메인 메뉴' : '서브 메뉴';

  const { addOrderItem, handleTotalPrice } = useOrderStore();

  const updateOrder = (count: number) => {
    addOrderItem({
      menuId: menu.menuId,
      menuName: menu.menuName,
      menuCount: count,
      menuPrice: menuUnitPrice * count,
    });
    handleTotalPrice();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = Math.min(99, Math.max(0, Number(value)));
    setMenuNum(numValue);
    updateOrder(numValue);
  };

  const handleClick = (type: 'plus' | 'minus') => {
    setMenuNum((prev) => {
      const newValue = type === 'plus' ? Math.min(prev + 1, 99) : Math.max(prev - 1, 0);
      updateOrder(newValue);
      return newValue;
    });
  };

  const getMenuImageStyle = (menuImage?: string): React.CSSProperties => ({
    backgroundImage: `url(${menuImage || '/images/booth/booth-default-image.png'})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  });

  return (
    <div className="flex gap-5 py-4 items-center w-full border-b border-[#999999ad]">
      <div
        className="min-w-[120px] w-[120px] h-[120px] rounded-3xl border-2 border-secondary-100"
        style={getMenuImageStyle(menu.menuImage)}
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-secondary-700">{menu.menuName}</div>
          <div className="text-3xs text-secondary-500 bg-secondary-50 rounded-full w-[46px] h-[18px] flex items-center justify-center shrink-0">
            {menuType}
          </div>
        </div>
        <div className="font-light text-secondary-300 text-sm">{menu.menuDescription}</div>
        <div className="font-light text-secondary-300 text-sm">가격: {formatPrice(menuUnitPrice)}원</div>
        <div className="flex pt-3 justify-between items-center">
          <div className={`font-semibold ${menuNum ? 'text-secondary-700' : 'text-secondary-100'}`}>
            {formatPrice(menuUnitPrice * menuNum)}원
          </div>
          <div className="w-[118px] flex flex-row gap-[10px]">
            <img src="/icons/orders/minus.svg" className="cursor-pointer" onClick={() => handleClick('minus')} />
            <input
              className="w-[62px] h-7 rounded-[1.75rem] border border-secondary-500 text-center focus:outline-none"
              type="text"
              value={menuNum}
              inputMode="numeric"
              maxLength={2}
              onChange={handleInputChange}
              placeholder="0"
            />
            <img src="/icons/orders/plus.svg" className="cursor-pointer" onClick={() => handleClick('plus')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
