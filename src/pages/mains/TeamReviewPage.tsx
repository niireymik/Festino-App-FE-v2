import Header from '@/components/headers/Header';
import Profile from '@/components/teamreview/Profile';
import { Member } from '@/components/teamreview/Profile';

const TeamReviewPage: React.FC = () => {
  const members: Member[] = [
    {
      name: '김성준',
      major: '컴퓨터공학부',
      position: '총괄리더',
      image: './images/teams/people/seongjun.svg',
      blog: 'https://kim-song-jun.github.io/',
    },
    {
      name: '이승민',
      major: '컴퓨터공학부',
      position: '부리더 | BE팀장',
      image: './images/teams/people/seungmin.svg',
      blog: 'https://seeungmin.github.io/',
    },
    {
      name: '이희연',
      major: '컴퓨터공학부',
      position: 'FE팀장',
      image: './images/teams/people/huiyeon.svg',
      blog: 'https://heedonguri.tistory.com/',
    },
    {
      name: '정지훈',
      major: '디자인공학부',
      position: 'UX/UI 팀장',
      image: './images/teams/people/jihun.svg',
      blog: '',
    },
    {
      name: '임정윤',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teams/people/jeongyun.svg',
      blog: 'https://hmyang.tistory.com/',
    },
    {
      name: '김민지',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teams/people/minji.svg',
      blog: 'https://alswlfjddl.tistory.com/',
    },
    {
      name: '진효찬',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teams/people/minji.svg',
      blog: 'https://gycks0225.tistory.com',
    },
    {
      name: '최세연',
      major: '컴퓨터공학부',
      position: 'FE팀원',
      image: './images/teams/people/minji.svg',
      blog: 'https://velog.io/@seyeonnnn/posts',
    },
    {
      name: '김경민',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teams/people/gyeongmin.svg',
      blog: 'https://velog.io/@rvbear/posts',
    },
    {
      name: '김예린',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teams/people/yerin.svg',
      blog: 'https://velog.io/@niireymik/posts',
    },
    {
      name: '김태건',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teams/people/taegeon.svg',
      blog: 'https://idyidy.tistory.com/',
    },
    {
      name: '유수현',
      major: '컴퓨터공학부',
      position: 'BE팀원',
      image: './images/teams/people/suhyeon.svg',
      blog: 'https://blog.naver.com/dbtngus20',
    },
    {
      name: '김규리',
      major: '디자인공학부',
      position: 'UX/UI팀원',
      image: './images/teams/people/gyuri.svg',
      blog: '',
    },
    {
      name: '임혜지',
      major: '디자인공학부',
      position: 'UX/UI팀원',
      image: './images/teams/people/hyeji.svg',
      blog: '',
    },
  ];

  return (
    <>
      <Header />
      <div className="flex flex-col w-full items-center justify-center px-5 gap-4 pt-14 pb-14">
        <div className="text-primary-900 text-xs font-bold text-center">FESTINO</div>
        <div className="text-primary-900 text-2xl font-bold text-center">페스티노 개발진 소개</div>
        <div className="text-[#4B4B4B] text-base text-center">
          한국공학대학교 컴퓨터공학부 9명과
          <br />
          디자인공학부 3명으로 제작된 프로젝트
        </div>
        <div className="grid grid-cols-2 w-full sm:px-4 justify-center pt-8 gap-x-2.5 gap-y-4 justify-items-center">
          {members.map((member, index) => (
            <Profile key={index} member={member} />
          ))}{' '}
        </div>
      </div>
    </>
  );
};

export default TeamReviewPage;
