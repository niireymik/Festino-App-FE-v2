import React from 'react';
import { useBoothMapStore } from '@/stores/booths/boothMapStore';
import { openNewTap } from '@/utils/utils';

interface Props {
  boothId: number;
}

export const MapSpeechBubble: React.FC<Props> = ({ boothId }) => {
  const { boothDataMap } = useBoothMapStore();
  const booth = boothDataMap[boothId];

  if (!booth) return null;
  
  return (
    <div className="p-2 rounded-lg border border-primary-500 shadow-lg bg-white animate-fade-in">
      <div className="flex flex-col items-start gap-1">
        <div className="text-sm font-semibold text-primary-900">{booth.boothName}</div>
        <div className="text-xs text-muted-foreground line-clamp-2">{booth.boothIntro}</div>
        <button
          className="mt-1 px-2 py-1 text-xs border rounded-md border-primary-300 hover:bg-primary-50"
          onClick={() => openNewTap("https://www.instagram.com/tukorea_drama/")}
        >
          자세히 보기
        </button>
      </div>
    </div>
  );
};