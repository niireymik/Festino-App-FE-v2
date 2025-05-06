import useBaseModal from "@/stores/baseModal";
import ModalBackground from "@/components/modals/ModalBackground";
import TimetableModal from "@/components/homes/TimetableModal"

const ModalPage = () => {
  const { isModalOpen, modalType } = useBaseModal();
  
  if (!isModalOpen) return null;

  return (
    <ModalBackground>
      {modalType === "timetable" && <TimetableModal />}
    </ModalBackground>
  );
};

export default ModalPage;