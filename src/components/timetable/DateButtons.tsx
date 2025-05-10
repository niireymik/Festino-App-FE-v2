import React from 'react';

const DateButtons: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center">
      <button className="bg-primary-700 text-white px-4 py-1 rounded-full">DAY 1</button>
      <button className="bg-secondary-100 text-secondary-700 px-4 py-1 rounded-full">DAY 2</button>
    </div>
  );
};

export default DateButtons;