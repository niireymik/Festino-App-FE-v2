const NoBooth: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-2 py-2">
        <p className="text-xl font-medium">예약 가능한 부스가 없습니다.</p>
        <div className="bg-error-full bg-cover bg-center bg-no-repeat w-full aspect-[35/26]"></div>
      </div>
      ;
    </>
  );
};

export default NoBooth;