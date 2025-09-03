import React from 'react';
import MobileBottomNav from './MobileBottomNav';

interface MobileLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  showBottomNav = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主内容区域 */}
      <div className={`${showBottomNav ? 'pb-20' : ''}`}>
        {children}
      </div>
      
      {/* 底部导航栏 */}
      {showBottomNav && <MobileBottomNav />}
    </div>
  );
};

export default MobileLayout;
