import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from '../pages/other/HomePage';
import CccPage from '../pages/other/CccPage';
import WeatherPage from '../pages/other/WeatherPage';
import LoginPage from '../pages/other/LoginPage';
import TestPage from '../pages/other/TestPage';
import ThemeShowcasePage from '../pages/other/ThemeShowcasePage';
import ComponentShowcasePage from '../pages/other/ComponentShowcasePage';
import DashboardPage from '../pages/other/DashboardPage';
import LoadingShowcasePage from '../pages/other/LoadingShowcasePage';
import MobileHomePage from '../pages/marathon/MobileHomePage';
import MobileVotePage from '../pages/marathon/MobileVotePage';
import MobileProjectsPage from '../pages/marathon/MobileProjectsPage';
import MobileRecordsPage from '../pages/marathon/MobileRecordsPage';
import MobileProfilePage from '../pages/marathon/MobileProfilePage';
import MobileLoginPage from '../pages/marathon/MobileLoginPage';
import MobileRegisterPage from '../pages/marathon/MobileRegisterPage';
import MobileForgotPasswordPage from '../pages/marathon/MobileForgotPasswordPage';
import GlobalHeader from '../components/GlobalHeader';
import ErrorBoundary from '../components/ErrorBoundary';

// 带 GlobalHeader 的布局组件
const WithHeaderLayout: React.FC = () => {
  return (
    <div className="app min-h-screen bg-background text-foreground">
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

// 不带 GlobalHeader 的布局组件
const WithoutHeaderLayout: React.FC = () => {
  return (
    <div className="app min-h-screen bg-background text-foreground">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 默认重定向到移动端 */}
      <Route path="/" element={<Navigate to="/mobile" replace />} />
      
      {/* 带 GlobalHeader 的路由（other 目录的页面） */}
      <Route element={<WithHeaderLayout />}>
        <Route path="/home" element={<ErrorBoundary><HomePage /></ErrorBoundary>} />
        <Route path="/ccc" element={<ErrorBoundary><CccPage /></ErrorBoundary>} />
        <Route path="/weather" element={<ErrorBoundary><WeatherPage /></ErrorBoundary>} />
        <Route path="/login" element={<ErrorBoundary><LoginPage /></ErrorBoundary>} />
        <Route path="/test" element={<ErrorBoundary><TestPage /></ErrorBoundary>} />
        <Route path="/themes" element={<ErrorBoundary><ThemeShowcasePage /></ErrorBoundary>} />
        <Route path="/showcase" element={<ErrorBoundary><ComponentShowcasePage /></ErrorBoundary>} />
        <Route path="/loading" element={<ErrorBoundary><LoadingShowcasePage /></ErrorBoundary>} />
        <Route path="/dashboard" element={<ErrorBoundary><DashboardPage /></ErrorBoundary>} />
      </Route>
      
      {/* 不带 GlobalHeader 的路由（marathon 目录的页面） */}
      <Route element={<WithoutHeaderLayout />}>
        <Route path="/mobile/login" element={<ErrorBoundary><MobileLoginPage /></ErrorBoundary>} />
        <Route path="/mobile/register" element={<ErrorBoundary><MobileRegisterPage /></ErrorBoundary>} />
        <Route path="/mobile/forgot-password" element={<ErrorBoundary><MobileForgotPasswordPage /></ErrorBoundary>} />
        <Route path="/mobile" element={<ErrorBoundary><MobileHomePage /></ErrorBoundary>} />
        <Route path="/mobile/vote" element={<ErrorBoundary><MobileVotePage /></ErrorBoundary>} />
        <Route path="/mobile/projects" element={<ErrorBoundary><MobileProjectsPage /></ErrorBoundary>} />
        <Route path="/mobile/records" element={<ErrorBoundary><MobileRecordsPage /></ErrorBoundary>} />
        <Route path="/mobile/profile" element={<ErrorBoundary><MobileProfilePage /></ErrorBoundary>} />
      </Route>
      
      {/* 默认重定向到移动端 */}
      <Route path="*" element={<Navigate to="/mobile" />} />
    </Routes>
  );
};

export default AppRoutes;
