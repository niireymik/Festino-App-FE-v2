import useBaseModal from '@/stores/baseModal';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Corner = 'bottom-left' | 'bottom-right';

const FloatingButton: React.FC = () => {
  const hidePaths = ['/register', '/order', '/reserve', '/team-review', '/photo-board'];
  const translateHeights = ['translate-y-sub-btn-1', 'translate-y-sub-btn-2', 'translate-y-sub-btn-3'];

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrag, setIsDrag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const offset = useRef({ x: 0, y: 0 });
  const dragHistory = useRef(false);

  const { isModalOpen, openModal } = useBaseModal();

  const handleClickReviewEvent = () => {
    setIsOpen(false);
    navigate('/team-review');
  };

  const handleClickUploadEvent = () => {
    setIsOpen(false);
    navigate('/photo-board');
  };

  const handleClickQuizEvent = () => {
    setIsOpen(false);
    openModal('quizModal');
  };

  const subButtons = [
    {
      label: '리뷰\n이벤트',
      onClick: () => handleClickReviewEvent(),
    },
    {
      label: '사진 업로드\n이벤트',
      onClick: () => handleClickUploadEvent(),
    },
    {
      label: '실시간 퀴즈\n이벤트',
      onClick: () => handleClickQuizEvent(),
    },
  ];

  const BUTTON_SIZE = 60;
  const H_MARGIN = 70;
  const W_MARGIN = 20;

  const handleClick = () => {
    if (dragHistory.current) return; // 드래그로 판단되면 클릭 무시
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    setPosition({
      x: screenWidth - BUTTON_SIZE - W_MARGIN,
      y: screenHeight - BUTTON_SIZE - H_MARGIN,
    });
  }, []);

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsDrag(true);
      dragHistory.current = false;
      offset.current = {
        x: clientX - position.x,
        y: clientY - position.y,
      };
    },
    [position],
  );

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDrag) return;
      const dx = clientX - offset.current.x;
      const dy = clientY - offset.current.y;
      const distance = Math.hypot(dx - position.x, dy - position.y);
      if (distance > 5) {
        dragHistory.current = true; // 실제로 움직였다고 판단
      }
      setPosition({ x: dx, y: dy });
    },
    [isDrag, position],
  );

  const handleEnd = useCallback(() => {
    setIsDrag(false);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const corners: Record<Corner, { x: number; y: number }> = {
      'bottom-left': { x: W_MARGIN, y: screenHeight - BUTTON_SIZE - H_MARGIN },
      'bottom-right': { x: screenWidth - BUTTON_SIZE - W_MARGIN, y: screenHeight - BUTTON_SIZE - H_MARGIN },
    };

    let closestCornerKey: Corner = 'bottom-right';
    let minDist = Infinity;

    for (const [key, pos] of Object.entries(corners) as [Corner, { x: number; y: number }][]) {
      const dist = Math.hypot(position.x - pos.x, position.y - pos.y);
      if (dist < minDist) {
        minDist = dist;
        closestCornerKey = key;
      }
    }

    setPosition(corners[closestCornerKey]);
  }, [position]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const mouseUp = () => handleEnd();

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, [handleMove, handleEnd]);

  useEffect(() => {
    const touchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };
    const touchEnd = () => handleEnd();

    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchEnd);
    return () => {
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
    };
  }, [handleMove, handleEnd]);

  if (hidePaths.some((path) => location.pathname.startsWith(path))) return null;

  return (
    <div className={`absolute ${isModalOpen ? 'z-30' : 'z-40'}`} style={{ left: position.x, top: position.y }}>
      {subButtons.map((btn, idx) => (
        <button
          key={idx}
          onClick={btn.onClick}
          className={`
      absolute left-1/2 -translate-x-1/2
      w-[58px] h-[58px] rounded-full bg-primary-900 text-white text-2xs font-bold
      flex items-center justify-center shadow-md
      transition-all duration-300 whitespace-pre-line
      ${isOpen ? `opacity-100 ${translateHeights[idx]}` : 'opacity-0 translate-y-0'}
      ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
    `}
        >
          {btn.label}
        </button>
      ))}

      <div
        onClick={handleClick}
        onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
        className={`
          relative
          flex items-center justify-center
          w-[60px] h-[60px] bg-white border-2 border-primary-900
          rounded-full text-primary-900 text-xs font-bold cursor-grab
          select-none touch-none
        `}
      >
        EVENT
      </div>
    </div>
  );
};

export default FloatingButton;
