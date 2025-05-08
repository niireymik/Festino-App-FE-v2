import { useEffect, useMemo, useState } from 'react';
import { useReservationStore } from '@/stores/tabling/tablingStore';
import { formatPhoneNum } from '@/utils/utils';
import PersonalInfo from '../commons/PersonalInfo';
import { usePersonalInfoStore } from '@/stores/personalInfoStore';
import useBaseModal from '@/stores/baseModal';
import { useNavigate } from 'react-router-dom';

const SearchReservation: React.FC = () => {
  const [isInputNameFocused, setIsInputNameFocused] = useState<boolean>(false);
  const [isInputPhoneNumFocused, setIsInputPhoneNumFocused] = useState<boolean>(false);
  const [isInputFill, setIsInputFill] = useState<boolean>(false);

  const { getReservation, setUserName, setRecentPhoneNum, setRecentName, recentName, recentPhoneNum } =
    useReservationStore();
  const { isAgreed } = usePersonalInfoStore();
  const { openModal, closeModal } = useBaseModal();
  const navigate = useNavigate();

  const regex = useMemo(() => /^010/, []);

  const handleClickSearchButton = async () => {
    if (!isInputFill || !isAgreed) return;
    const inputInfo = { userName: recentName, phoneNum: formatPhoneNum(recentPhoneNum) };
    await getReservation(inputInfo, { openModal, closeModal, navigate });
    setUserName(recentName);
  };

  const formattedPhoneNum = (phoneNum: string) => {
    const inputValue = phoneNum.replace(/\D/g, '');
    let formattedValue = '';

    if (inputValue.length > 3 && inputValue.length < 8) {
      formattedValue = inputValue.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (inputValue.length >= 8) {
      formattedValue = inputValue.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    } else {
      formattedValue = inputValue;
    }
    return formattedValue;
  };

  useEffect(() => {
    setIsInputFill(recentName.length >= 2 && recentPhoneNum.length === 13 && regex.test(recentPhoneNum));
  }, [recentName, recentPhoneNum, regex]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formattedPhoneNum(e.target.value);
    setRecentPhoneNum(formatted);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣 ]/g, '').slice(0, 5);
    setRecentName(filtered); // Zustand store의 recentName setter 함수
  };

  useEffect(() => {
    if (isInputNameFocused) {
      document.getElementById('nameInput')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (isInputPhoneNumFocused) {
      document.getElementById('phoneNumInput')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isInputNameFocused, isInputPhoneNumFocused]);

  return (
    <>
      <div className="w-screen max-w-[500px] min-w-[375px]">
        <div className="w-full h-fu ll flex flex-col dynamic-padding pt-20 justify-between flex-grow">
          <div className="px-4">
            <div className="text-xs">이름</div>
            <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
              <img src="/icons/tabling/person.svg" className="w-6 h-6" />
              <input
                className="flex-1 focus:outline-none bg-inherit"
                type="text"
                value={recentName}
                placeholder="티노"
                maxLength={5}
                onChange={handleNameChange}
                onFocus={() => setIsInputNameFocused(true)}
                onBlur={() => setIsInputNameFocused(false)}
                id="nameInput"
              />
            </div>
            <hr
              className={`mb-[30px] border-0 h-[1px] ${isInputNameFocused ? 'bg-primary-900' : 'bg-secondary-500-light-20'}`}
            />
            <div className="text-xs">전화번호</div>
            <div className="h-11 w-full flex flex-row items-center py-2.5 gap-2.5">
              <img src="/icons/tabling/phone.svg" className="w-6 h-6" />
              <input
                className="flex-1 focus:outline-none bg-inherit"
                type="tel"
                placeholder="010-1234-5678"
                maxLength={13}
                value={recentPhoneNum}
                onChange={handlePhoneChange}
                onFocus={() => setIsInputPhoneNumFocused(true)}
                onBlur={() => setIsInputPhoneNumFocused(false)}
                id="phoneNumInput"
              />
            </div>
            <hr
              className={`border-0 h-[1px] mb-5 ${isInputPhoneNumFocused ? 'bg-primary-900' : 'bg-secondary-500-light-20'}`}
            />
            <PersonalInfo />
          </div>
          <div className="px-5">
            <button
              type="button"
              className={`w-full h-[60px] text-white font-bold rounded-10xl mb-20 mt-5 ${
                isInputFill && isAgreed ? 'bg-primary-900' : 'bg-secondary-100'
              }`}
              onClick={handleClickSearchButton}
              disabled={!(isInputFill && isAgreed)}
            >
              조회하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchReservation;
