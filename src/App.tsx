import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CccPage from './pages/CccPage';
import WeatherPage from './pages/WeatherPage';
import LoginPage from './pages/LoginPage';
import TestPage from './pages/TestPage';
import ThemeShowcasePage from './pages/ThemeShowcasePage';
import ComponentShowcasePage from './pages/ComponentShowcasePage';
import DashboardPage from './pages/DashboardPage';
import GlobalHeader from './components/GlobalHeader';
import './styles/globals.css';
import './styles/themes.css';
import './styles/App.less';

const App: React.FC = () => {
  return (
    <div className="app min-h-screen bg-background text-foreground">
      <GlobalHeader />
      <main>
        <Routes>
          {/* 主页路由 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/ccc" element={<CccPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/themes" element={<ThemeShowcasePage />} />
          <Route path="/showcase" element={<ComponentShowcasePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* 默认重定向到主页 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
