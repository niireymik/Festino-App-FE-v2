const Notice : React.FC = () => {
  return (
    <>
      <div className="flex flex-col py-5 gap-5 px-4 justify-center w-full">
        <div className="flex items-center justify-between px-2">
          <div className="font-medium break-words text-secondary-500">
            공지사항 제목
          </div>
          <div className="text-xs text-secondary-300">2024.04.29 18:47</div>
        </div>
        <div className="w-full h-auto flex flex-col rounded-3xl border-primary-900-light-16 border justify-center items-center p-5 gap-[20px] select-none">
          <div className="relative w-full">
            <div className="w-full rounded-3xl border border-primary-900-light-16 aspect-square flex justify-center items-center"> 공지사항 이미지 </div>
          </div>
          <div className="w-full text-xs break-words px-1 whitespace-pre-wrap">공지사항 관련 내용</div>
        </div>
      </div>
    </>
  );
};

export default Notice;