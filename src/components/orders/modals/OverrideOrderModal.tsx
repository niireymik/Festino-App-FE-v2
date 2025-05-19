import useBaseModal from '@/stores/baseModal';
import { sendWebSocketMessage } from '@/utils/orderSocket';
import { useOrderStore } from '@/stores/orders/orderStore';

const OverrideOrderModal: React.FC = () => {
    const { closeModal } = useBaseModal();
    const { boothId, tableNum } = useOrderStore(); 

  const { openModal } = useBaseModal();

  const handleOverride = () => {
    console.log('예 버튼 클릭됨');
    if (!boothId || !tableNum) {
      console.warn('boothId 또는 tableNum 잘못됨:', boothId, tableNum);
      return;
    }

    closeModal();

    console.log('웹소켓 메시지 전송 시작');

    sendWebSocketMessage({
      type: 'STARTORDER',
      boothId,
      tableNum: Number(tableNum),
    });

    sendWebSocketMessage({
      type: 'ORDERINPROGRESS',
      boothId,
      tableNum: Number(tableNum),
    });

    openModal('orderModal');
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal} // 배경 누르면 모달 닫힘
    >
      <div
        className="relative col-start-2 row-start-2 bg-white rounded-3xl flex flex-col items-center px-10 py-8 gap-5 w-[320px] max-w-full"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 전파 막음
      >
        <div className="w-12 h-12 bg-error rounded-full grid place-items-center">
          <img src="/icons/commons/error.svg" />
        </div>
        <div className="w-full flex flex-col gap-3 items-center break-keep text-center">
          <p className="text-secondary-700 text-xl font-bold">주문 권한 가져오기</p>
          <p className="text-secondary-500">
            다른 사용자가 주문 중입니다.
            <br />
            권한을 가져와 주문하시겠습니까?
          </p>
        </div>
        <div className="flex w-full gap-3 font-bold">
          <button
            className="w-full h-11 rounded-full border-2 border-primary-900 text-primary-900"
            onClick={closeModal}
          >
            아니오
          </button>
          <button className="w-full h-11 rounded-full text-white bg-primary-900" onClick={handleOverride}>
            예
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverrideOrderModal;
