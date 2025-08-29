import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeSwitcher from './ThemeSwitcher';
import { Home, TestTube, Cloud, User, Settings, Palette } from 'lucide-react';

const GlobalHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/dashboard', label: '仪表板', icon: Settings },
    { path: '/test', label: '测试', icon: TestTube },
    { path: '/showcase', label: '组件', icon: Palette },
    { path: '/themes', label: '主题', icon: Palette },
    { path: '/weather', label: '天气', icon: Cloud },
    { path: '/login', label: '登录', icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* 左侧：Logo */}
        <div className="flex items-center gap-2">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-lg">Demo App</span>
          </div>
        </div>

        {/* 中间：导航菜单 */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* 右侧：主题切换器 */}
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
