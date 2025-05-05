import { create } from "zustand"; 

interface IBaseModal {
  isModalOpen: boolean;
  modalType: string;
  setModalType: (type: string) => void;
  openModal: (type:string) => void;
  closeModal: () => void;
}

const useBaseModal = create<IBaseModal>((set) => ({
  isModalOpen: false,
  modalType: "",
  setModalType: (type) => set({ modalType: type }),
  openModal: (type) =>
    set({
      isModalOpen: true,
      modalType: type,
    }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useBaseModal;