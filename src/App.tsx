import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/mains/HomePage';
import TimeTablePage from './pages/mains/TimeTablePage';
import BoothPage from './pages/mains/BoothPage';
import TablingPage from './pages/mains/TablingPage';
import MainLayout from './layouts/MainLayout';
import NotificationPage from './pages/mains/NotificationPage';
import OrderLayout from './layouts/OrderLayout';
import OrderHomePage from './pages/orders/OrderHomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="timetable" element={<TimeTablePage />} />
          <Route path="booth" element={<BoothPage />} />
          <Route path="reserve" element={<TablingPage />} />
          <Route path="notification" element={<NotificationPage />} />
        </Route>

        {/* Order */}
        <Route path="/order" element={<OrderLayout />}>
          <Route path=":boothId/:tableNum" element={<OrderHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
