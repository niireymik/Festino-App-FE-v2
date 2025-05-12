import React from 'react';
import { useBaseModal } from '@/stores/baseModal';
import OrderConfirmModal from './OrderConfirmModal';
import OrderCompleteModal from './OrderCompletemodal';
import OrderModal from './OrderModal';

const ModalRenderer: React.FC = () => {
  const { isModalOpen, modalType, closeModal } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>
        {modalType === 'orderModal' && <OrderModal />}

        {modalType === 'orderConfirmModal' && <OrderConfirmModal />}
        {modalType === 'orderCompleteModal' && <OrderCompleteModal />}
      </div>
    </div>
  );
};

export default ModalRenderer;
