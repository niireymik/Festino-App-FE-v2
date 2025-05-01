// 목데이터 (Mock Booth List)

export const mockBoothList = [
  [
    {
      adminCategory: "야간부스",
      boothId: 1,
      boothIntro: "야간에만 운영하는 특별한 부스입니다.",
      boothName: "밤하늘 바비큐",
      boothImage: "/images/booth/night-bbq.jpg",
      isOpen: true,
      openTime: "18:00",
      closeTime: "23:00",
    },
    {
      adminCategory: "야간부스",
      boothId: 2,
      boothIntro: "야경과 함께 즐기는 맥주 한 잔",
      boothName: "별빛 맥주",
      boothImage: null,
      isOpen: false,
      openTime: "19:00",
      closeTime: "24:00",
    },
  ],
  [
    {
      adminCategory: "주간부스",
      boothId: 3,
      boothIntro: "주간에도 신나게 즐길 수 있는 다양한 활동",
      boothName: "햇살 놀이터",
      boothImage: "/images/booth/day-fun.jpg",
      isOpen: true,
      openTime: "10:00",
      closeTime: "17:00",
    },
  ],
  [
    {
      adminCategory: "푸드트럭",
      boothId: 4,
      boothIntro: "다양한 맛을 즐길 수 있는 푸드트럭",
      boothName: "길거리 음식 페스티벌",
      boothImage: "/images/booth/food-truck.jpg",
      isOpen: true,
      openTime: "11:00",
      closeTime: "21:00",
    },
  ],
  [
    {
      adminCategory: "편의시설",
      boothId: 5,
      boothIntro: "편하게 쉴 수 있는 휴게 공간",
      boothName: "릴렉스존",
      boothImage: null,
      isOpen: true,
      openTime: "09:00",
      closeTime: "20:00",
    },
  ],
];