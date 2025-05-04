import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleClickMainSymbol = () => {
    navigate('/', { replace: true });
  };
  const handleClickTinoSymbol = () => {
    navigate('/team-review', { replace: true });
  };

  return (
    <div className="w-full h-[58px] flex flex-row bg-white justify-between px-5 items-center">
      <div
        className="w-[68px] h-[36px] bg-header-festino-logo bg-center bg-no-repeat bg-[length:68px_36px] cursor-pointer"
        onClick={() => handleClickMainSymbol()}
      />
      <div
        className="w-[32px] h-[32px] bg-header-team-introduction bg-center bg-no-repeat bg-[length:32px_32px] cursor-pointer"
        onClick={() => handleClickTinoSymbol()}
      />
    </div>
  );
};

export default Header;
