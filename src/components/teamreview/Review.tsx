import React from 'react';
import { useState } from 'react';

const Review: React.FC = () => {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const handleClickReviewSubmit = async () => {
    if (email && !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const response = await api.post('/main/review', {
        content,
        email,
      });
      if (!response.data.success) {
        alert('Something went wrong, Please try again');
        return;
      }
    } catch (error) {
      alert('Something went wrong, Please try again');
      console.error(error);
      return;
    }
  };

  return (
    <>
      <textarea
        placeholder="내용을 작성해주세요."
        className="text-xs border border-gray-200 rounded w-full px-4 py-4 h-[200px] resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex w-full justify-between items-center placeholder-gray-400">
        <input
          type="text"
          placeholder="이메일 (선택사항)"
          className="text-xs rounded-lg border border-gray-200 px-4 w-[200px] h-[33px] align-middle"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleClickReviewSubmit}
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
