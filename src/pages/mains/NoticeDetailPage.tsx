import Notice from '@/components/homes/notices/Notice';
import Header from '@/components/headers/Header';
import NoticeHeader from '@/components/homes/notices/NoticeHeader';

const NoticeDetailPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen h-full items-center bg-primary-50 select-none pb-16">
      <Header />
      <NoticeHeader />
      <Notice />
      <div className="py-30"></div>
    </div>
  );
};

export default NoticeDetailPage;