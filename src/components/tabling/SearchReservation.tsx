import { useState } from 'react';

const SearchReservation: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [isInputNameFocused, setIsInputNameFocused] = useState(false);
  const [isInputPhoneNumFocused, setIsInputPhoneNumFocused] = useState(false);

  const isActive = name.trim() !== '' && phoneNum.trim() !== '';

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '');
    let formatted = '';
    if (digitsOnly.length < 4) formatted = digitsOnly;
    else if (digitsOnly.length < 8) formatted = digitsOnly.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    else formatted = digitsOnly.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');

    setPhoneNum(formatted);
  };

  const handleClickSearchButton = () => {
    if (!isActive) return;
    alert(`이름: ${name}, 전화번호: ${phoneNum}`);
  };

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
                value={name}
                placeholder="티노"
                maxLength={5}
                onChange={(e) => setName(e.target.value)}
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
                value={phoneNum}
                onChange={handlePhoneChange}
                onFocus={() => setIsInputPhoneNumFocused(true)}
                onBlur={() => setIsInputPhoneNumFocused(false)}
                id="phoneNumInput"
              />
            </div>
            <hr
              className={`border-0 h-[1px] mb-5 ${isInputPhoneNumFocused ? 'bg-primary-900' : 'bg-secondary-500-light-20'}`}
            />
            {/* <PersonalInfo /> */}
          </div>
          <div className="px-5">
            <button
              type="button"
              className={`w-full h-[60px] text-white font-bold rounded-10xl mb-20 mt-5 ${
                isActive ? 'bg-primary-900' : 'bg-secondary-100'
              }`}
              onClick={handleClickSearchButton}
              disabled={!isActive}
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
