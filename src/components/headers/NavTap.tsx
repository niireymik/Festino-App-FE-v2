import useNavTapStore from '@/stores/headers/navTapStore';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useBaseModal from '@/stores/baseModal';
import { useAuthStore } from '@/stores/auths/authStore';

const NavTap = () => {
  // 전역 상태에서 네비게이션 탭 열림 여부 및 닫기 함수 가져오기
  const navigate = useNavigate();

  const { isOpen, close } = useNavTapStore();
  const { openModal } = useBaseModal();
  const { isLogin, userName } = useAuthStore(); // ✅ 상태 추출

  // 이벤트 메뉴(아코디언)의 열림 상태
  const [isEventOpen, setIsEventOpen] = useState(false);
  const toggleEvent = () => setIsEventOpen((prev) => !prev);

  // 네비게이션 탭이 닫혀있다면 아무것도 렌더링하지 않음
  useEffect(() => {
    if (!isOpen) {
      setIsEventOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      {/* 어두운 배경 오버레이 (클릭 시 네비게이션 닫힘) */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
        onClick={close}
      />

      {/* 왼쪽에서 슬라이드되는 네비게이션 바 */}
      <div
        className={`fixed top-0 left-0 h-full w-5/6 bg-white z-50 shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-12">
          {/* 닫기(햄버거) 버튼 */}
          <div className="flex h-[60px] w-full items-center justify-end px-5">
            <div
              className="w-[22px] h-[22px] bg-header-navigation-bar bg-center bg-no-repeat bg-[length:22px_22px]
            cursor-pointer"
              onClick={close}
            />
          </div>

          {/* 로그인 아이콘 및 텍스트 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className={`w-[80px] h-[80px] ${isLogin ? 'bg-header-team-introduction' : 'bg-header-navigation-person'} bg-center bg-no-repeat bg-[length:80px_80px]
            cursor-pointer`}
              onClick={() => {
                if (!isLogin) {
                  close();
                  openModal('loginModal');
                }
              }}
            ></div>
            <div
              className="text-center font-bold text-lg cursor-pointer"
              onClick={() => {
                if (!isLogin) {
                  close();
                  openModal('loginModal');
                }
              }}
            >
              {isLogin && userName ? `${userName}님 환영합니다!` : '로그인'}
            </div>
          </div>

          {/* 메뉴 리스트 */}
          <ul className="space-y-6 text-sm text-secondary-700">
            {/* 타임테이블 메뉴 */}
            <li
              onClick={() => {
                navigate('/timetable');
                close();
              }}
              className="px-6 cursor-pointer flex items-center gap-4"
            >
              <div className="w-[28px] h-[28px] bg-header-navigation-timetable bg-center bg-no-repeat"></div>
              <div className="text-xl text-secondary-300 font-bold">타임테이블</div>
            </li>

            {/* 부스 정보 메뉴 */}
            <li
              onClick={() => {
                navigate('/booths');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="w-[28px] h-[28px] bg-header-navigation-booth bg-center bg-no-repeat"></div>
              <div className="text-xl text-secondary-300 font-bold">부스 정보</div>
            </li>

            {/* 테이블링 메뉴 (현재 이동 없음) */}
            <li
              onClick={() => {
                navigate('/reserve');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="w-[28px] h-[28px] bg-header-navigation-tabling bg-center bg-no-repeat"></div>
              <div className="text-xl text-secondary-300 font-bold">테이블링</div>
            </li>

            {/* 공지사항 메뉴 */}
            <li
              onClick={() => {
                navigate('/notices');
                close();
              }}
              className="px-6 pt-2 cursor-pointer flex items-center gap-4"
            >
              <div className="w-[28px] h-[28px] bg-header-navigation-notice bg-center bg-no-repeat"></div>
              <div className="text-xl text-secondary-300 font-bold">공지사항</div>
            </li>
            <div
              className={`px-6 py-2 w-full items-center transition-colors duration-200 ${isEventOpen ? 'bg-gray-100' : ''}`}
            >
              {/* 이벤트 아코디언 메뉴 (서브메뉴 토글) */}
              <li className="cursor-pointer flex items-center gap-2" onClick={toggleEvent}>
                <div className="flex w-full justify-between">
                  {/* 왼쪽 아이콘 및 텍스트 */}
                  <div className="flex gap-4">
                    <div className="w-[28px] h-[28px] bg-header-navigation-event bg-center bg-no-repeat"></div>
                    <div className="text-xl text-secondary-300 font-bold">이벤트</div>
                  </div>
                  {/* 화살표 아이콘 (아코디언 상태 표시) */}
                  <div>
                    <div
                      className={`w-[28px] h-[28px] bg-header-navigation-event-open bg-center bg-no-repeat transition-transform duration-300 ${isEventOpen ? 'rotate-180' : 'rotate-0'} `}
                    />
                  </div>
                </div>
              </li>

              {/* 아코디언 열렸을 때 서브메뉴 표시 */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden origin-top ${isEventOpen ? 'opacity-100 scale-y-100 max-h-40' : 'opacity-0 scale-y-0 max-h-0'}`}
              >
                <ul className="pl-9 py-5 space-y-6 text-lg font-semibold text-secondary-400">
                  {/* 리뷰 이벤트 */}
                  <li
                    className="cursor-pointer px-2"
                    onClick={() => {
                      navigate('/team-review');
                      close();
                    }}
                  >
                    리뷰 이벤트
                  </li>
                  {/* 실시간 퀴즈 이벤트 (알림창으로 처리) */}
                  <li
                    className="cursor-pointer px-2"
                    onClick={() => {
                      alert('퀴즈 모달 열기');
                      close();
                    }}
                  >
                    실시간 퀴즈 이벤트
                  </li>
                  {/* 사진 업로드 이벤트 */}
                  <li
                    className="cursor-pointer px-2"
                    onClick={() => {
                      navigate('/photo-board');
                      close();
                    }}
                  >
                    사진 업로드 이벤트
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavTap;
