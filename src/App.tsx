import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/mains/HomePage';
import TimeTablePage from './pages/mains/TimeTablePage';
import BoothPage from './pages/mains/BoothPage';
import TablingPage from './pages/mains/TablingPage';
import MainLayout from './layouts/MainLayout';
import NoticePage from './pages/mains/NoticePage';
import NoticeDetailPage from './pages/mains/NoticeDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/timetable" element={<TimeTablePage />} />
          <Route path="/booth" element={<BoothPage />} />
          <Route path="/reserve" element={<TablingPage />} />
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/notices/:noticeId" element={<NoticeDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
