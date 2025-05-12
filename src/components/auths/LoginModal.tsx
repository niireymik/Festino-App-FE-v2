import useBaseModal from '@/stores/baseModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginModal: React.FC = () => {
  const { closeModal } = useBaseModal();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('로그인 시도:', { username, password });
  };

  const handleClickRegist = () => {
    navigate('/register');
    closeModal();
  };

  return (
    <div
      className="relative col-start-2 row-start-2 h-full dynamic-width bg-white rounded-3xl flex flex-col items-center px-6 py-6 gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <button className="absolute top-[30px] right-8 w-[32px] h-[32px]" onClick={closeModal}>
        <img src="/icons/commons/x.png" />
      </button>

      <div className="w-full flex flex-col gap-6">
        <h2 className="text-primary-900 text-3xl font-bold text-center">Login</h2>

        <div className="flex w-full h-14 items-center border border-primary-900 rounded-full px-4 py-3 gap-3">
          <img src="/icons/tablings/person.svg" alt="user" className="w-6 h-6 opacity-50" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 text-m placeholder-secondary-400 focus:outline-none"
          />
        </div>

        <div className="flex w-full h-14 items-center border border-primary-900 rounded-full px-4 py-3 gap-3">
          <img src="/icons/tablings/phone.svg" className="w-6 h-6 opacity-50" />
          <input
            type="text"
            placeholder="Phonenum"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 text-m placeholder-secondary-400 focus:outline-none"
          />
        </div>

        <button
          className="w-full h-14 bg-primary-900 rounded-full text-white font-semibold text-lg hover:bg-blue-600"
          onClick={handleLogin}
        >
          로그인하기
        </button>

        <p className="text-sm text-secondary-400 text-center">
          계정이 존재하지 않나요?{' '}
          <span className="text-primary-900 font-medium cursor-pointer" onClick={() => handleClickRegist()}>
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
