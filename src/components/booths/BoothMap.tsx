import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MapSpeechBubble } from '@/components/booths/MapSpeechBubble';
import { useParams } from 'react-router-dom';
import { useBoothStore } from '@/stores/booths/boothStore';
import 'primeicons/primeicons.css';
import { Booth, BoothInfo } from '@/types/Booth.types';

interface Marker {
  markerNum?: number;
  left: number;
  bottom: number;
  scrollLeft?: number;
  scrollTop?: number;
  count?: number;
  tab?: number;
  category?: string;
}

const BoothMap: React.FC = () => {
  const markers: {
    more: Marker[];
    detail: Record<string, Marker[]>;
  } = {
    more: [
      { left: 160, bottom: 120, count: 14, tab: 1 },
      { left: 425, bottom: 240, count: 21, tab: 2 },
      { left: 100, bottom: 280, count: 13, tab: 3 },
      { left: 100, bottom: 350, count: 4, tab: 4 },
      { left: 290, bottom: 320, count: 2, tab: 4 },
    ],
    detail: {
      smoke: [
        { markerNum: 77, left: 150, bottom: 430, scrollLeft: 235, scrollTop: 0 }, // 팁 뒤
        { markerNum: 78, left: 30, bottom: 175, scrollLeft: 0, scrollTop: 580 }, // 운동장 구석
      ],
      store: [
        { markerNum: 75, left: 150, bottom: 370, scrollLeft: 235, scrollTop: 90 }, // 종관
        { markerNum: 76, left: 500, bottom: 367, scrollLeft: 1200, scrollTop: 110 }, // GS
      ],
      toilet: [
        { markerNum: 71, left: 150, bottom: 350, scrollLeft: 235, scrollTop: 90 },
        { markerNum: 72, left: 70, bottom: 350, scrollLeft: 20, scrollTop: 130 },
        { markerNum: 73, left: 520, bottom: 367, scrollLeft: 1200, scrollTop: 110 },
        { markerNum: 74, left: 440, bottom: 367, scrollLeft: 970, scrollTop: 110 },
      ],
      general: [
        // 총학 이벤트 추가되면 활성화
        { markerNum: 92, left: 420, bottom: 340, scrollLeft: 925, scrollTop: 170 },
        { markerNum: 90, left: 476, bottom: 310, scrollLeft: 1065, scrollTop: 240 },
        { markerNum: 93, left: 476, bottom: 250, scrollLeft: 1065, scrollTop: 390 },
      ],
      ticket: [
        //총학 티켓
        { markerNum: 91, left: 302, bottom: 325, scrollLeft: 620, scrollTop: 200 },
        { markerNum: 94, left: 360, bottom: 280, scrollLeft: 750, scrollTop: 300 },
      ],
      alcohol: [
        { markerNum: 95, left: 50, bottom: 85, scrollLeft: 0, scrollTop: 820 },
      ],
      music: [{ markerNum: 27, left: 420, bottom: 235, scrollLeft: 920, scrollTop: 410 }],
      join: [
        // B동 앞
        { markerNum: 21, left: 385, bottom: 310, scrollLeft: 835, scrollTop: 240 },
        { markerNum: 22, left: 405, bottom: 310, scrollLeft: 890, scrollTop: 240 },
        // B동이랑 벙커 사이 통로
        { markerNum: 23, left: 420, bottom: 300, scrollLeft: 925, scrollTop: 270 },
        { markerNum: 24, left: 440, bottom: 285, scrollLeft: 970, scrollTop: 310 },
        { markerNum: 25, left: 420, bottom: 270, scrollLeft: 925, scrollTop: 340 },
        { markerNum: 26, left: 440, bottom: 255, scrollLeft: 970, scrollTop: 370 },
        { markerNum: 28, left: 440, bottom: 220, scrollLeft: 970, scrollTop: 480 },
        { markerNum: 29, left: 420, bottom: 205, scrollLeft: 925, scrollTop: 490 },
        { markerNum: 30, left: 440, bottom: 190, scrollLeft: 970, scrollTop: 540 },
        { markerNum: 36, left: 528, bottom: 300, scrollLeft: 1200, scrollTop: 270 },
        { markerNum: 35, left: 510, bottom: 280, scrollLeft: 1200, scrollTop: 310 },
        { markerNum: 34, left: 528, bottom: 235, scrollLeft: 1200, scrollTop: 450 },
        { markerNum: 33, left: 510, bottom: 220, scrollLeft: 1200, scrollTop: 470 },
        { markerNum: 32, left: 528, bottom: 205, scrollLeft: 1200, scrollTop: 510 },
        { markerNum: 31, left: 510, bottom: 190, scrollLeft: 1200, scrollTop: 530 },
      ],
      food: [
        // 야간부스
        { markerNum: 1, left: 145, bottom: 175, scrollLeft: 220, scrollTop: 580 },
        { markerNum: 2, left: 120, bottom: 175, scrollLeft: 160, scrollTop: 580 },
        { markerNum: 3, left: 95, bottom: 175, scrollLeft: 90, scrollTop: 580 },
        { markerNum: 4, left: 70, bottom: 175, scrollLeft: 20, scrollTop: 580 },
        { markerNum: 5, left: 50, bottom: 155, scrollLeft: 0, scrollTop: 620 },
        { markerNum: 6, left: 50, bottom: 130, scrollLeft: 0, scrollTop: 690 },
        { markerNum: 7, left: 50, bottom: 105, scrollLeft: 0, scrollTop: 760 },
        { markerNum: 12, left: 170, bottom: 85, scrollLeft: 290, scrollTop: 820 },
        { markerNum: 11, left: 145, bottom: 85, scrollLeft: 220, scrollTop: 820 },
        { markerNum: 10, left: 120, bottom: 85, scrollLeft: 160, scrollTop: 820 },
        { markerNum: 9, left: 95, bottom: 85, scrollLeft: 90, scrollTop: 820 },
        { markerNum: 8, left: 70, bottom: 85, scrollLeft: 20, scrollTop: 820 },
        // 주간부스
        // 푸드트럭
        { markerNum: 51, left: 20, bottom: 290, scrollLeft: 0, scrollTop: 300 },
        { markerNum: 52, left: 40, bottom: 280, scrollLeft: 0, scrollTop: 300 },
        { markerNum: 53, left: 60, bottom: 290, scrollLeft: 0, scrollTop: 300 },
        { markerNum: 54, left: 80, bottom: 280, scrollLeft: 45, scrollTop: 300 },
        { markerNum: 55, left: 100, bottom: 290, scrollLeft: 90, scrollTop: 300 },
        { markerNum: 56, left: 120, bottom: 280, scrollLeft: 150, scrollTop: 300 },
        { markerNum: 57, left: 140, bottom: 290, scrollLeft: 200, scrollTop: 300 },
        { markerNum: 58, left: 160, bottom: 280, scrollLeft: 250, scrollTop: 300 },
        { markerNum: 59, left: 180, bottom: 290, scrollLeft: 300, scrollTop: 300 },
        { markerNum: 60, left: 200, bottom: 280, scrollLeft: 350, scrollTop: 300 },
        { markerNum: 61, left: 220, bottom: 290, scrollLeft: 400, scrollTop: 300 },
        { markerNum: 62, left: 240, bottom: 280, scrollLeft: 450, scrollTop: 300 },
        { markerNum: 63, left: 260, bottom: 290, scrollLeft: 500, scrollTop: 300 },
      ],
    },
  };

  const { type } = useParams();
  const imageUrl = '/images/booths/map.svg';
  const isBoothDetail = Boolean(type);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [boothDataMap, setBoothDataMap] = useState<Record<number, BoothInfo>>({});
  const [selectedBooth, setSelectedBooth] = useState<BoothInfo | null>(null);
  const { boothListNight, boothListDay, boothListFood, getBoothDetail, selectBoothCategory, setSelectBoothCategory } = useBoothStore();

  // 확대/축소
  const handleZoom = (delta: number) => {
    setZoom((prev) => Math.min(Math.max(prev + delta, 1), 1.6));
  };

  // 포커스된 마커로 자동 스크롤
  const focusOnMarker = useCallback((marker: Marker) => {
    const container = containerRef.current;
    if (
      !container ||
      marker.scrollLeft == null ||
      marker.scrollTop == null
    ) return;
  
    container.scrollTo({
      left: (marker.scrollLeft! / 1.6) * zoom,
      top: (marker.scrollTop! / 1.6) * zoom,
      behavior: 'smooth'
    });
  }, [zoom]);  
  
  const handleBigBoothMarker = useCallback((marker: Marker) => {
    if (marker.tab === undefined) return;
    setSelectBoothCategory(marker.tab);
    setSelectedMarker(marker);
  }, [setSelectBoothCategory]);  

  const scrollToFirstMarker = async () => {
    if (![1, 2, 3].includes(selectBoothCategory)) return;

    let boothList: Booth[] = [];
    let type = '';

    if (selectBoothCategory === 1) {
      boothList = boothListNight;
      type = '야간부스';
    } else if (selectBoothCategory === 2) {
      boothList = boothListDay;
      type = '주간부스';
    } else if (selectBoothCategory === 3) {
      boothList = boothListFood;
      type = '푸드트럭';
    }

    if (boothList.length === 0) return;

    const boothInfo = await getBoothDetail(type, boothList[0].boothId);

    if (!boothInfo?.markerNum) return;

    const found = Object.values(markers.detail).flat().find(
      (marker) => marker.markerNum === boothInfo.markerNum
    );

    if (!found) {
      return;
    }

    setSelectedMarker(found);
  };

  const handleMarkerClick = async (marker: Marker) => {
    if (!marker.markerNum) return;
    setSelectedMarker(marker);

    const booth = boothDataMap[marker.markerNum];

    if (booth) {
      setSelectedBooth(booth);
    } else {
      // 필요 시 실시간 요청하여 업데이트 가능
      let boothList: Booth[] = [];
      let boothType = '';

      if (selectBoothCategory === 1) {
        boothList = boothListNight;
        boothType = '야간부스';
      } else if (selectBoothCategory === 2) {
        boothList = boothListDay;
        boothType = '주간부스';
      } else if (selectBoothCategory === 3) {
        boothList = boothListFood;
        boothType = '푸드트럭';
      }

      const boothInfo = boothList.find((b) => b.boothId);
      if (!boothInfo) return;
      const detail = await getBoothDetail(boothType, boothInfo.boothId);
      if (detail?.markerNum) {
        setBoothDataMap((prev) => ({ ...prev, [detail.markerNum]: detail }));
        setSelectedBooth(detail);
      }
    }
  };
  
  useEffect(() => {
    isBoothDetail;
  }, []);

  // 카테고리 변경될 때마다 실행
  useEffect(() => {
    if (selectBoothCategory === 0) {
      setZoom(1);
      scrollToFirstMarker();
    } else if ([1, 2, 3, 4].includes(selectBoothCategory)) {
      setZoom(1.6);
      scrollToFirstMarker();
    }
  }, [zoom, selectBoothCategory]);
  
  // 선택한 마커 변경될 시
  useEffect(() => {
    if (selectedMarker) {
      focusOnMarker(selectedMarker);
      handleMarkerClick(selectedMarker);
    }
  }, [selectedMarker, focusOnMarker]);

  return (
    <div className="dynamic-padding">
      <div className="relative w-full aspect-square">
        <div
          ref={containerRef}
          className="relative aspect-square w-full min-h-[340px] h-[340px] xs:h-[390px] sm:h-[453.5px] max-h-[453.5px] bg-map-color border border-primary-900-light rounded-3xl overflow-auto touch-pan-x touch-pan-y"
          style={{ touchAction: 'pan-x pan-y' }}
        >
          <div
            className="relative bg-cover"
            style={{
              width: `${587 * zoom}px`,
              height: `${518 * zoom}px`,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
          >
            {/* 지도 이미지 */}
            <img 
              src={imageUrl}
              alt="Booth Map"
              className="absolute w-full h-full"
              draggable={false}
            />

            {/* 부스 페이지용 */}
            {(zoom <= 1.4 && !isBoothDetail) && (
              <>
                {/* 대왕 마커 */}
                {markers.more.map((marker, index) => (
                  <div
                    key={`more-${index}`}
                    className="absolute cursor-pointer transition-transform duration-500 ease-in-out"
                    style={{
                      left: `${marker.left * zoom}px`,
                      bottom: `${marker.bottom * zoom}px`,
                      transform: `scale(${1 / zoom})`,
                      transformOrigin: 'center bottom',
                    }}
                    onClick={() => handleBigBoothMarker(marker)}
                  >
                    <div className="w-[72px] h-[72px] bg-[url('/icons/booths/markers/more.svg')] bg-cover flex justify-center items-center relative">
                      <span className="absolute top-1/4 text-white font-extrabold text-[15px] select-none">
                        +{marker.count}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}
            {zoom > 1.4 && (
              <>
                {/* 각 부스별 마커 */}
                {Object.entries(markers.detail).map(([category, markerList]) =>
                  markerList.map((marker, idx) => (
                    <div
                      key={`${category}-${idx}`}
                      className="absolute cursor-pointer transition-transform duration-500 ease-in-out"
                      style={{
                        left: `${marker.left * zoom}px`,
                        bottom: `${marker.bottom * zoom}px`,
                        transform: `scale(${selectedMarker?.markerNum === marker.markerNum ? 1.3 / zoom : 1 / zoom})`,
                        transformOrigin: 'center bottom',
                        zIndex: selectedMarker?.markerNum === marker.markerNum ? 1000 : 500,
                      }}
                      onClick={() => handleMarkerClick(marker)}
                    >
                      <motion.div
                        className="relative w-14 h-14 bg-cover flex justify-center"
                        style={{ 
                          backgroundImage: 
                            selectedMarker?.markerNum === marker.markerNum ?
                              `url(/icons/booths/markers/after/${category}.svg)` :
                              `url(/icons/booths/markers/before/${category}.svg)`
                        }}
                      >
                        {selectedMarker?.markerNum === marker.markerNum && selectedBooth && (
                          <div className="absolute bottom-16">
                            <MapSpeechBubble booth={selectedBooth} />
                          </div>
                        )}
                      </motion.div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>

        {/* 부스 상세페이지용 (수정해야함) */}
        {isBoothDetail && (
          <>
            {/* 해당 부스 마커만 표시 */}
            {Object.entries(markers.detail).map(([category, markerList]) =>
              markerList.map((marker, idx) => (
                <div
                  key={`${category}-${idx}`}
                  className="absolute cursor-pointer transition-transform duration-500 ease-in-out"
                  style={{
                    left: `${marker.left * zoom}px`,
                    bottom: `${marker.bottom * zoom}px`,
                    transform: `scale(${selectedMarker?.markerNum === marker.markerNum ? 1.3 / zoom : 1 / zoom})`,
                    transformOrigin: 'center bottom',
                    zIndex: selectedMarker?.markerNum === marker.markerNum ? 1000 : 500,
                  }}
                  onClick={() => {setSelectedMarker(marker)}}
                >
                  <motion.div
                    className="relative w-14 h-14 bg-cover"
                    style={{ 
                      backgroundImage: 
                        selectedMarker?.markerNum === marker.markerNum ?
                          `url(/icons/booths/markers/after/${category}.svg)` :
                          `url(/icons/booths/markers/before/${category}.svg)`
                    }}
                  >
                    {selectedBooth && (
                      <div className="absolute bottom-16">
                        <MapSpeechBubble booth={selectedBooth} />
                      </div>
                    )}
                  </motion.div>
                </div>
              ))
            )}
          </>
        )}

        {/* 확대/축소 버튼 */}
        <div className="absolute bottom-5 left-5 flex flex-col shadow-xl rounded-full overflow-hidden border border-primary-200">
          <button
            className="rounded-none border-b border-primary-100 bg-white p-4 active:bg-primary-900"
            onClick={() => handleZoom(0.3)}
          >
            <i className="pi pi-plus text-primary-900 text-lg"></i>
          </button>
          <button
            className="rounded-none bg-white p-4 active:bg-primary-900"
            onClick={() => handleZoom(-0.3)}
          >
            <i className="pi pi-minus text-primary-900 text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoothMap;