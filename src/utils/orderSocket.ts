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
    onConnect: (frame) => {
      const sessionId = frame.headers['session-id'];
      useSocketStore.getState().setSessionId(sessionId); 
      console.log('[WebSocket 연결됨] 내 세션 ID:', sessionId);

      newClient.subscribe(`/topic/${boothId}/${tableNum}`, onMessage);
      newClient.subscribe(`/user/topic/${boothId}/${tableNum}`, onMessage);

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
      set.setRemainingMinutes(payload.remainingMinutes);
      break;
    }

    case 'MEMBERUPDATE': {
      set.setMemberCount(data.payload.memberCount);
      break;
    }
    case 'MENUUPDATE': {
      const { menuId, menuCount, totalPrice } = data.payload;

      const { userOrderList, addOrderItem, setTotalPrice } = useOrderStore.getState();
      const existing = userOrderList.find((item) => item.menuId === menuId);

      addOrderItem({
        menuId,
        menuName: existing?.menuName || '',
        menuPrice: existing?.menuPrice || 0,
        menuCount,
      });

      if (typeof totalPrice === 'number') {
        setTotalPrice(totalPrice);
      }

      break;
    }

    case 'STARTORDER': {
      const senderSessionId = message.headers['sender-session-id'];
      const mySessionId = useSocketStore.getState().sessionId;

      if (mySessionId !== senderSessionId) {
        disconnectOrderSocket(data.boothId, data.tableNum);
        alert('다른 사용자가 주문을 진행하고 있습니다. 메인화면으로 이동합니다.');
        window.location.href = `/order/${data.boothId}/${data.tableNum}`;
      } else {
        console.log('[내가 보낸 STARTORDER 메시지: 이동하지 않음]');
      }
      break;
    }

    case 'TIMEUPDATE': {
      set.setRemainingMinutes(data.payload.remainingMinutes);
      break;
    }
    case 'PRESESSIONEND': {
      alert('⚠️ 세션이 1분 후 종료됩니다.');
      break;
    }
    case 'SESSIONEND': {
      alert('❌ 세션이 종료되었습니다. 처음 화면으로 돌아갑니다.');
      window.location.href = `/order/${data.boothId}/${data.tableNum}`; 
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
  type: 'MENUADD' | 'MENUSUB' | 'STARTORDER' | 'UNSUB' | 'INIT';
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

  console.log('payload', payload);

  client?.publish({
    destination: '/app/order',
    body: JSON.stringify(payload),
  });
};
