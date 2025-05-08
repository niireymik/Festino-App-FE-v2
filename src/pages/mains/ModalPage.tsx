import useBaseModal from '@/stores/baseModal';
import ModalBackground from '@/components/modals/ModalBackground';
import TimetableModal from '@/components/homes/TimetableModal';
import NoReserveModal from '@/components/tabling/modals/NoReserveModal';
import LoadingModal from '@/components/tabling/modals/LoadingModal';
import FailReservationModal from '@/components/tabling/modals/FailReservationModal';
import EnterBoothModal from '@/components/tabling/modals/EnterBoothModal';
import SearchReservationModal from '@/components/tabling/modals/SearchReservationModal';
import DuplicateModal from '@/components/tabling/modals/DuplicateModal';

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();

  if (!isModalOpen) return null;

  return (
    <ModalBackground>
      {modalType === 'timetable' && <TimetableModal />}
      {modalType === 'loadingModal' && <LoadingModal />}
      {modalType === 'failReservationModal' && <FailReservationModal />}
      {modalType === 'enterBoothModal' && <EnterBoothModal />}
      {modalType === 'searchReservationModal' && <SearchReservationModal />}
      {modalType === 'noReserveModal' && <NoReserveModal />}
      {modalType === 'duplicateModal' && <DuplicateModal />}
    </ModalBackground>
  );
};

export default ModalPage;
