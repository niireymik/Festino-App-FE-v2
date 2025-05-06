import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/utils/api';

export type AccountInfo = {
  account: string;
  accountHolder: string;
  bankName: string;
};

export type OrderItem = {
  menuId: string;
  menuName: string;
  menuCount: number;
  menuPrice: number;
};

export type MenuInfo = {
  menuId: string;
  menuName: string;
  menuPrice: number;
  menuDescription: string;
  menuImage: string;
  isSoldOut: boolean;
  menuType: string;
};

export type BoothDetailInfo = {
  adminName: string;
};

export const useOrderStore = () => {
  const navigate = useNavigate();

  const [recentPhoneNum, setRecentPhoneNum] = useState('');
  const [recentName, setRecentName] = useState('');
  const [orderList, setOrderList] = useState<OrderItem[]>([]);
  const [boothId, setBoothId] = useState('');
  const [menuInfo, setMenuInfo] = useState<MenuInfo[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userOrderList, setUserOrderList] = useState<OrderItem[]>([]);
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [tableNum, setTableNum] = useState(0);
  const [customTableNum, setCustomTableNum] = useState('');
  const [isCoupon, setIsCoupon] = useState(false);
  const [note, setNote] = useState('');
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    account: '',
    accountHolder: '',
    bankName: '',
  });

  const resetOrderInfo = () => {
    setOrderList([]);
    setUserOrderList([]);
    setTotalPrice(0);
  };

  const getMenuAll = async (boothId: string) => {
    try {
      const res = await api.get(`/main/menu/all/booth/${boothId}`);
      if (res.data.success && Array.isArray(res.data.menuList)) {
        const validMenus = res.data.menuList.filter(
          (menu: MenuInfo) =>
            menu &&
            typeof menu.menuId === 'string' &&
            typeof menu.menuName === 'string' &&
            typeof menu.menuPrice === 'number' &&
            typeof menu.menuType === 'string',
        );
        setMenuInfo(validMenus);
      } else {
        navigate('/error/NotFound');
      }
    } catch (error) {
      console.error('Error get menu data:', error);
      navigate('/error/NotFound');
    }
  };

  const handleTotalPrice = useCallback(() => {
    const total = userOrderList.reduce((sum, item) => sum + item.menuPrice, 0);
    setTotalPrice(total);
  }, [userOrderList]);

  const addOrderItem = (order: OrderItem) => {
    setUserOrderList((prev) => {
      const exists = prev.find((o) => o.menuId === order.menuId);
      if (exists) {
        return prev.map((o) => (o.menuId === order.menuId ? order : o));
      }
      return [...prev, order];
    });
  };

  const getCustomTableNum = async (tableNum: number, boothId: string): Promise<string> => {
    try {
      const res = await api.get('/main/order/table', {
        params: { tableNumIndex: tableNum, boothId },
      });
      console.log(res.data);
      if (res.data.success) return res.data.tableNum;
      else navigate('/error/NotFound');
    } catch {
      navigate('/error/NotFound');
    }
    return '';
  };

  const setBoothInfo = async (id: string, num: number) => {
    const table = await getCustomTableNum(num, id);
    setBoothId(id);
    setTableNum(num);
    setCustomTableNum(table);
  };

  const isUUID = (uuid: string): boolean => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    return regex.test(uuid);
  };

  const getBoothDetail = async (id: string): Promise<BoothDetailInfo | undefined> => {
    try {
      const res = await api.get(`/main/booth/night/${id}`);
      if (res.data.success) return res.data.boothInfo;
      else navigate('/error/NotFound');
    } catch {
      navigate('/error/NotFound');
    }
  };

  return {
    // states
    recentPhoneNum,
    setRecentPhoneNum,
    recentName,
    setRecentName,
    orderList,
    setOrderList,
    boothId,
    menuInfo,
    setMenuInfo,
    totalPrice,
    userOrderList,
    userName,
    setUserName,
    phoneNum,
    setPhoneNum,
    tableNum,
    customTableNum,
    isCoupon,
    setIsCoupon,
    note,
    setNote,
    accountInfo,

    // methods
    resetOrderInfo,
    handleTotalPrice,
    addOrderItem,
    setBoothInfo,
    isUUID,
    getBoothDetail,
    getMenuAll,
  };
};
