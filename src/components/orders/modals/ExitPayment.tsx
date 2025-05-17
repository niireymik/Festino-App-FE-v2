import useBaseModal from '@/stores/baseModal';
import { useOrderStore } from '@/stores/orders/orderStore';
import { useNavigate } from 'react-router-dom';

const ExitPaymentModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const navigate = useNavigate();
  const { boothId, tableNum } = useOrderStore();

  return (
    <>
      <div
        className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold"> 주문 퇴장</p>
          <p className="text-secondary-500">주문을 그만두시겠습니까?</p>
        </div>
        <div className="flex w-full gap-[10px] font-bold">
          <button
            className="w-full h-11 grow rounded-full border-2 border-primary-900-light-68 text-primary-900"
            onClick={() => closeModal()}
          >
            취소
          </button>
          <button
            className="w-full h-11 grow rounded-full text-white bg-primary-900"
            onClick={() => navigate(`/order/${boothId}/${tableNum}`)}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
};

export default ExitPaymentModal;
