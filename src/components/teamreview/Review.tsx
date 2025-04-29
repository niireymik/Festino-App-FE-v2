const Review: React.FC = () => {
  return (
    <>
      <textarea
        placeholder="내용을 작성해주세요."
        className="text-xs border border-gray-200 rounded w-full px-4 py-4 h-[200px] resize-none"
        v-model="content"
      ></textarea>
      <div className="flex w-full justify-between items-center placeholder-gray-400">
        <input
          type="text"
          placeholder="이메일 (선택사항)"
          className="text-xs rounded-lg border border-gray-200 px-4 w-[200px] h-[33px] align-middle"
          v-model="email"
        />
        <button
          className="text-primary-900 w-[112px] h-[33px] flex items-center justify-center rounded-lg border border-gray-200 gap-2 py-4"
          type="button"
        >
          <img src="./images/teamreview/send.svg" /> 보내기
        </button>
      </div>
    </>
  );
};

export default Review;
