import BoothIcon from "@/components/footers/BoothIcon";
import HomeIcon from "@/components/footers/HomeIcon";
import TablingIcon from "@/components/footers/TablingIcon";
import TimeTableIcon from "@/components/footers/TimeTableIcon";

export const ICON_URL_MAP = [
  { name: '홈', component: HomeIcon, width: '28px', router: '' },
  { name: '타임테이블', component: TimeTableIcon, url: '/icons/acute.svg', width: '44px', router: 'timetable' },
  { name: '부스', component: BoothIcon, url: '/icons/distance.svg', width: '28px', router: 'booth' },
  { name: '테이블링', component: TablingIcon, url: '/icons/hourglass_bottom.svg', width: '35px', router: 'reserve' },
];