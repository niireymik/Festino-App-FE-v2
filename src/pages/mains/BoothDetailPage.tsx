import { useNavigate, useParams } from "react-router-dom";
import { MockBoothDetailList } from "@/mocks/boothData";
import BoothMap from "@/components/booths/BoothMap";
import MenuItem from "@/components/booths/MenuItem";
import ImageSlider from "@/components/commons/ImageSlider";

const BoothDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { boothId } = useParams<{ boothId: string }>();

  const booth = MockBoothDetailList.find(
    (item) => Number(item.boothId) === Number(boothId)
  );

  const handleClickBoothDetailBack = () => {
    navigate("/booth");
  };

  const sloganMap: { [key: string]: string } = {
    "야간부스": "먹거리가 가득한",
    "주간부스": "즐거움이 가득한",
    "푸드트럭": "먹거리가 가득한",
  };

  const getSlogan = () => sloganMap[booth?.adminCategory || ""] || "";

  if (!booth) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mt-4 text-center text-sm text-gray-600">
          부스 정보를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const handleClickInstagram = () => {
    if (booth?.instagram) {
      window.open(`https://www.instagram.com/${booth.instagram}/`, "_blank");
    }
  };

  const handleRouterToReserve = () => {
    navigate(`/reserve/${booth.boothId}`);
  };

  return (
    <div className="dynamic-bottom">
      {/* 배너 */}
      <div className="relative">
        <div className="w-full h-[220px] xs:h-[255px] sm:h-[295px] bg-booth-detail-banner bg-cover">
          <div
            onClick={handleClickBoothDetailBack}
            className="z-4 bg-arrow-back w-6 h-6 bg-no-repeat text-xl absolute top-[24px] left-[24px] bg-cover pointer-events-auto cursor-pointer"
          />
          {/* 슬로건 + 운영진 */}
          <div className="absolute w-auto h-auto dynamic-top dynamic-padding">
            <div className="bg-gradient-to-b from-white from-50% to-primary-300 bg-clip-text text-transparent font-jalnan2 text-md xs:text-md sm:text-[19px]">
              {getSlogan()}
            </div>
            <div className="font-jalnan2 text-2xl bg-gradient-to-b from-white from-50% to-primary-300 bg-clip-text text-transparent sm:text-3xl">
              {booth.adminName ? booth.adminName : booth.boothName}
            </div>
          </div>
        </div>
        <div className="w-full h-5 bg-white rounded-t-3xl absolute z-2 bottom-[-2px]"></div>
      </div>

      {/* Tab 표시 */}
      <div className="flex dynamic-padding items-center mt-4 pb-2">
        <div className="text-secondary-300 text-sm font-light">{booth.adminCategory}</div>
        <div className="text-secondary-300 bg-arrow-forward bg-cover w-[14px] h-[14px] mx-2"></div>
        <div className="text-secondary-300 text-sm font-light">{booth.adminName ? `${booth.adminName} 부스` : booth.boothName}</div>
      </div>

      {/* 지도 */}
      <BoothMap />

      {/* 위치 및 운영 정보 */}
      <div className="dynamic-padding py-4">
        <div className="w-full h-auto bg-tag rounded-2xl p-4">
          <div className="flex items-center pb-3">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">위치</div>
            <div className="pl-4 text-secondary-500 font-light text-xs">{booth.location || booth.adminCategory}</div>
          </div>
          <div className="flex items-center">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">운영시간</div>
            <div className="pl-4 text-secondary-500 font-light text-xs">{booth.openTime} ~ {booth.closeTime}</div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-3 bg-tag" />

      {/* 부스 이미지 슬라이드 */}
      <div className="relative pt-[2.33%] px-[4.65%] pb-9">
        <ImageSlider images={booth.boothImage} />

        {/* 인스타그램 버튼 */}
        {booth.instagram && (
          <div
            onClick={() => handleClickInstagram()}
            className="text-xs text-secondary-500 rounded-full w-fit h-[26px] flex items-center justify-center bg-tag gap-1 mt-6 px-3 cursor-pointer"
          >
            <div className="min-w-[16px] h-[16px] bg-instagram bg-center bg-no-repeat bg-[length:16px_16px]" />
            <div>@{booth.instagram}</div>
          </div>
        )}

        {/* 부스 소개글 */}
        <div className="pt-5 text-secondary-500 font-light break-words px-1 whitespace-pre-wrap">
          {booth.boothIntro}
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full h-3 bg-tag" />

      {/* 메뉴 요약 */}
      <div className="dynamic-padding py-4">
        <div className="w-full h-auto bg-tag rounded-2xl p-4">
          <div className="flex items-center pb-3">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">메인메뉴</div>
            <div className="pl-4 text-secondary-500 font-light text-xs">마라샹궈, 깐풍기</div>
          </div>
          <div className="flex items-center">
            <div className="w-fit h-fit px-4 py-1 rounded-full bg-secondary-50 text-secondary-500 font-semibold text-xs">서브메뉴</div>
            <div className="pl-4 text-secondary-500 font-light text-xs">아이스호떡, 계란말이, 잔치국수</div>
          </div>
        </div>
      </div>

      {/* 메뉴 목록 */}
      {booth.menuList.map((menu) => (
        <MenuItem key={menu.menuId} menu={menu} />
      ))}

      {/* 구분선 */}
      <div className="w-full h-3 bg-tag" />

      {/* 예약 */}
      <div className="dynamic-padding">
        <div className="text-2xl font-semibold pb-3 pt-7">현재 대기중</div>
        <div
          className="border border-primary-100 mb-5 relative aspect-auto w-full h-[155px] xs:h-[171.3px] sm:h-[207px] bg-reservation-status bg-no-repeat bg-cover rounded-3xl"
        >
          <div className="absolute right-8 xs:right-10 top-6 xs:top-8 sm:top-12 flex flex-col items-center">
            <div className="px-4 py-1 mb-2 w-fit h-fit rounded-full bg-white text-primary-900 font-bold">
              대기중인 팀
            </div>
            <div className="flex items-end">
              <div className="font-bold text-7xl text-white">{ booth.totalReservationNum }</div>
              <div className="pb-2 font-semibold text-xl text-white">팀</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleRouterToReserve()}
          className="w-full h-auto py-4 mb-3 shadow-3xl border-1 border-primary-900 rounded-full text-primary-900 text-base active:text-white active:bg-primary-900"
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default BoothDetailPage;