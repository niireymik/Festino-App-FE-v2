import { Client, IMessage } from '@stomp/stompjs';
import { useOrderStore } from '@/stores/orders/orderStore';
import type { MenuListItem } from '@/types/WebSocket.types';
import { useSocketStore } from '@/stores/socketStore';

export const connectOrderSocket = (boothId: string, tableNum: number) => {
  const { client, setClient } = useSocketStore.getState();

  if (client && client.connected) return;

  const newClient = new Client({
    brokerURL: 'ws://localhost:8080/ws',
    reconnectDelay: 5000,
    onConnect: () => {
      newClient.subscribe(`/topic/${boothId}/${tableNum}`, onMessage);
      newClient.publish({
        destination: '/app/order',
        body: JSON.stringify({ type: 'SUBSCRIBE', boothId, tableNum }),
      });
    },
  });

  newClient.activate();
  setClient(newClient);
};
export const disconnectOrderSocket = (boothId: string, tableNum: number) => {
  const { client, clearClient } = useSocketStore.getState();

  if (client && client.connected) {
    client.publish({
      destination: '/app/order',
      body: JSON.stringify({ type: 'UNSUB', boothId, tableNum }),
    });

    client.deactivate();
    clearClient();
  }
};

const onMessage = (message: IMessage) => {
  const data = JSON.parse(message.body);
  const set = useOrderStore.getState();

  switch (data.type) {
    case 'INIT': {
      const payload = data.payload;
      if (Array.isArray(payload.menuList)) {
        const fullList = payload.menuList.map((menu: MenuListItem) => {
          const existing = set.menuInfo.find((m) => m.menuId === menu.menuId);
          return {
            menuId: menu.menuId,
            menuName: existing?.menuName || '',
            menuPrice: existing?.menuPrice || 0,
            menuDescription: existing?.menuDescription || '',
            menuImage: existing?.menuImage || '',
            menuType: existing?.menuType || 0,
            isSoldOut: existing?.isSoldOut || false,
            menuCount: menu.menuCount,
          };
        });

        if (set.userOrderList.length === 0) {
          set.setUserOrderList(fullList);
        }
      }

      set.setMemberCount(payload.memberCount);
      set.setTotalPrice(payload.totalPrice);
      break;
    }
    case 'MEMBERUPDATE': {
      set.setMemberCount(data.payload.memberCount);
      break;
    }
    case 'MENUUPDATE': {
      const { menuId, menuCount, totalPrice } = data.payload;
      const existing = set.userOrderList.find((item) => item.menuId === menuId);
      const updated = {
        menuId,
        menuName: existing?.menuName || '',
        menuPrice: existing?.menuPrice || 0,
        menuCount,
      };
      set.addOrderItem(updated);
      if (typeof totalPrice === 'number') set.setTotalPrice(totalPrice);
      break;
    }
    case 'STARTORDER': {
      // 주문 시작 시 다른 클라이언트 처리 로직 추가 가능
      break;
    }
    case 'SESSIONEND': {
      // 세션 종료 시 로직
      break;
    }
    case 'PRESESSIONEND': {
      // 세션 종료 1분 전 알림
      break;
    }
    case 'TIMEUPDATE': {
      // 시간 업데이트 (옵션)
      break;
    }
    case 'ERROR': {
      console.error('서버 오류:', data.payload);
      break;
    }
    default:
      console.warn('알 수 없는 메시지 타입:', data);
      break;
  }
};

type WebSocketPayload = {
  type: 'MENUADD' | 'MENUSUB' | 'STARTORDER' | 'UNSUB';
  boothId: string;
  tableNum: number;
  payload?: {
    menuId?: string;
    menuCount?: number;
    totalPrice?: number;
    totalCount?: number;
  };
};

export const sendWebSocketMessage = (payload: WebSocketPayload) => {
  const { client } = useSocketStore.getState();

  client?.publish({
    destination: '/app/order',
    body: JSON.stringify(payload),
  });
};
