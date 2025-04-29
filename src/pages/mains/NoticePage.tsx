import NoticeListItem from '@/components/homes/notices/NoticeListItem';
import NoticeHeader from '@/components/homes/notices/NoticeHeader';
import Header from '@/components/headers/Header';

const NoticePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-20">
      <Header />
      <NoticeHeader />
      <div className="px-4 flex justify-center w-full">
        <NoticeListItem />
      </div>
    </div>
  );
};

export default NoticePage;