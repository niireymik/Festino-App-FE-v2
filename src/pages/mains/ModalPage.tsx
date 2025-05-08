import useBaseModal from '@/stores/baseModal';
import ModalBackground from '@/components/modals/ModalBackground';
import TimetableModal from '@/components/homes/TimetableModal';
import NoReserveModal from '@/components/tabling/modals/NoReserveModal';

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <ModalBackground>
      {modalType === 'timetable' && <TimetableModal />}
      {modalType === 'noReserveModal' && <NoReserveModal />}
    </ModalBackground>
  );
};

export default ModalPage;
