import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/mains/HomePage';
import TimeTablePage from './pages/mains/TimeTablePage';
import BoothPage from './pages/mains/BoothPage';
import TablingPage from './pages/mains/TablingPage';
import TeamReviewPage from './pages/mains/TeamReviewPage';
import MainLayout from './layouts/MainLayout';
import NoticePage from './pages/mains/NoticePage';
import NoticeDetailPage from './pages/mains/NoticeDetailPage';
import OrderLayout from './layouts/OrderLayout';
import OrderHomePage from './pages/orders/OrderHomePage';
import BoothDetailPage from './pages/mains/BoothDetailPage';
import ScrollToTop from './components/commons/ScrollToTop';
import ModalPage from './pages/mains/ModalPage';
import RegisterPage from './pages/mains/RegisterPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ModalPage />
      <Routes>
        {/* Main */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="timetable" element={<TimeTablePage />} />
          <Route path="booths" element={<BoothPage />} />
          <Route path="booths/:type/:boothId" element={<BoothDetailPage />} />
          <Route path="reserve" element={<TablingPage />} />
          <Route path="team-review" element={<TeamReviewPage />} />
          <Route path="notices" element={<NoticePage />} />
          <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
          <Route path='register' element={<RegisterPage/>} />
        </Route>

        {/* Order */}
        <Route path="/order" element={<OrderLayout />}>
          <Route path=":boothId/:tableNum" element={<OrderHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
