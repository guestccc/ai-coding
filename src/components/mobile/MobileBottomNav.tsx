import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Vote, 
  FolderOpen, 
  History, 
  User 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: '首页',
    icon: Home,
    path: '/mobile'
  },
  {
    id: 'vote',
    label: '投票',
    icon: Vote,
    path: '/mobile/vote'
  },
  {
    id: 'projects',
    label: '作品',
    icon: FolderOpen,
    path: '/mobile/projects'
  },
  {
    id: 'records',
    label: '记录',
    icon: History,
    path: '/mobile/records'
  },
  {
    id: 'profile',
    label: '我的',
    icon: User,
    path: '/mobile/profile'
  }
];

const MobileBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center py-2 px-4 flex-1 transition-colors ${
                active 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
