import useBaseModal from '@/stores/baseModal';
import { usePhotoModalStore } from '@/stores/events/BoardStore';
import { useEffect } from 'react';

const ExtendPhotoModal: React.FC = () => {
  const { selectedPhoto } = usePhotoModalStore();
  const { closeModal } = useBaseModal();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeModal]);

  if (!selectedPhoto) return null;

  return (
    <div
      className="absolute bg-white rounded-xl overflow-hidden max-w-[80vw] max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={selectedPhoto.imageUrl} className="w-full h-auto max-h-[70vh] object-cover" />

      <div className="w-full px-6 py-4 bg-secondary-700 border-2 border-secondary-700  text-white flex justify-between items-center">
        <h2 className="text-base font-semibold">{selectedPhoto.mainUserName}</h2>
        <div className="flex items-center gap-1 text-sm">
          <img
            src={selectedPhoto.heart ? '/icons/events/full-heart.svg' : '/icons/events/empty-heart.svg'}
            className="w-5 h-5"
          />
          <span>{selectedPhoto.heartCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ExtendPhotoModal;
