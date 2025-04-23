import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/mains/HomePage';
import TimeTablePage from './pages/mains/TimeTablePage';
import BoothPage from './pages/mains/BoothPage';
import TablingPage from './pages/mains/TablingPage';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-900">
      <h1 className="text-3xl font-bold text-white">Tailwind is working!</h1>
    </div>
  );
}

export default App;
