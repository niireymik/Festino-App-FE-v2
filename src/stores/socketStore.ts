import { Client } from '@stomp/stompjs';
import { create } from 'zustand';

interface SocketState {
  client: Client | null;
  setClient: (client: Client) => void;
  clearClient: () => void;
}

export const useSocketStore = create<SocketState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
  clearClient: () => set({ client: null }),
}));
