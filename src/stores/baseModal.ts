import { create } from 'zustand';

interface BaseModalState {
  isModalOpen: boolean;
  modalType: string;

  openModal: (type: string) => void;
  closeModal: () => void;
  setModalType: (type: string) => void;
}

export const useBaseModal = create<BaseModalState>((set) => ({
  isModalOpen: false,
  modalType: '',

  openModal: (type: string) => set({ isModalOpen: true, modalType: type }),
  closeModal: () => set({ isModalOpen: false }),
  setModalType: (type: string) => set({ modalType: type }),
}));
