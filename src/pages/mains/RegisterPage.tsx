import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalInfo from '@/components/commons/PersonalInfo';
import Header from '@/components/headers/Header';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  const handleClickBackButton = () => {
    navigate(-1);
  };

  const handleClickVerifyButton = () => {
    if (name.trim() === '' || phone.trim() === '') {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    setShowCodeInput(true);
    // 인증 API 호출은 여기에
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhoneNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNum = e.target.value;
    const formatted = formatPhoneNumber(inputPhoneNum);
    setPhone(formatted);
  };

  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length < 4) return digits;
    if (digits.length < 8) return digits.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    return digits.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
  };

  return (
    <>
      <Header />

      <div className="max-w-[500px] w-full h-[60px] bg-white flex justify-between items-center px-6 shadow-xs z-50">
        <img src="/icons/homes/arrow-back.svg" className="w-5 cursor-pointer" onClick={handleClickBackButton} />
        <p className="font-medium text-xl">회원가입</p>
        <div className="w-7"></div>
      </div>

      <div className="dynamic-padding flex flex-col min-h-[calc(100vh-200px)] justify-between">
        <div className="flex flex-col gap-6">
          <div className="pt-6">
            <label className="flex text-base font-medium pb-2">이름</label>
            <input
              type="text"
              id="name"
              placeholder="실명을 입력해주세요"
              value={name}
              onChange={handleChangeName}
              className="w-full h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
            />
          </div>

          <div>
            <label className="flex text-base font-medium pb-2">전화번호</label>
            <div className="flex gap-2">
              <input
                type="text"
                id="phone"
                placeholder="010 -"
                value={phone}
                onChange={handleChangePhoneNum}
                className="w-4/5 h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
              />
              <button
                onClick={handleClickVerifyButton}
                className="w-1/5 px-4 py-4 font-bold text-white bg-primary-900 rounded-10xl"
              >
                인증
              </button>
            </div>

            {showCodeInput && (
              <div className="pt-3">
                <input
                  type="text"
                  placeholder="인증번호를 입력해주세요"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-14 py-4 px-5 text-base placeholder-secondary-400 bg-white focus:bg-white border-1 border-secondary-400 focus:border-primary-900 rounded-10xl focus:outline-none"
                />
              </div>
            )}
          </div>

          <PersonalInfo />
        </div>
        <button
          type="button"
          className="w-full h-14 py-4 px-5 mt-6 text-base font-bold text-white bg-primary-900  border-primary-900 rounded-10xl focus:outline-none"
        >
          회원가입하기
        </button>
      </div>
    </>
  );
};

export default RegisterPage;
