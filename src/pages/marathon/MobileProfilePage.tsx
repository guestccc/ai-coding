import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Settings, 
  Award, 
  TrendingUp, 
  LogOut,
  Edit,
  Bell,
  Shield,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MobileLayout from '@/components/mobile/MobileLayout';
import { MobilePageLoading } from '@/components/Loading';
import {
  getUserVotingStats
} from '@/services/mobile/voting';
import {
  getProfile
} from '@/services/mobile/user';
import {
  UserVotingStats
} from '@/types/mobile/voting';
import {
  User
} from '@/types/mobile/auth';

// 页面状态接口
interface ProfilePageState {
  userInfo: User | null;
  userStats: UserVotingStats | null;
  isLoading: boolean;
  error: string | null;
}

const MobileProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ProfilePageState>({
    userInfo: null,
    userStats: null,
    isLoading: true,
    error: null
  });

  // 处理登出
  const handleLogout = () => {
    // 清除本地存储的认证信息
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 跳转到登录页面
    navigate('/mobile/login');
  };

  // 加载用户数据
  useEffect(() => {
    const loadUserData = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        // 并行加载用户信息和统计数据
        const [profileResponse, statsResponse] = await Promise.all([
          getProfile(),
          getUserVotingStats()
        ]);
        
        setState(prev => ({
          ...prev,
          isLoading: false,
          userInfo: profileResponse.success ? profileResponse.data?.user || null : null,
          userStats: statsResponse.success ? (statsResponse.data || null) : null,
          error: (!profileResponse.success || !statsResponse.success) 
            ? '加载用户信息失败，请重试' 
            : null
        }));
      } catch (error) {
        console.error('加载用户数据失败:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: '加载用户信息失败，请重试'
        }));
      }
    };

    loadUserData();
  }, []);

  return (
    <MobileLayout>
      {state.isLoading ? (
        <MobilePageLoading text="加载用户信息..." variant="spinner" />
      ) : state.error ? (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">{state.error}</p>
            <Button onClick={() => window.location.reload()}>重新加载</Button>
          </div>
        </div>
      ) : (
        <>
          {/* 页面头部 */}
          <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
              {state.userInfo?.avatar ? (
                <img 
                  src={state.userInfo.avatar} 
                  alt={state.userInfo.name || '用户头像'} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserIcon className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">
                {state.userInfo?.name || '用户'}
              </h1>
              <p className="text-blue-100 text-sm">
                {state.userInfo?.role === 'judge' ? 'AI黑客松评委' :
                 state.userInfo?.role === 'participant' ? 'AI黑客松参与者' :
                 state.userInfo?.role === 'admin' ? 'AI黑客松管理员' :
                 'AI黑客松用户'}
              </p>
              {state.userInfo?.email && (
                <p className="text-blue-200 text-xs mt-1">
                  {state.userInfo.email}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* 统计卡片区 */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {state.userStats?.totalVotes || 0}
              </div>
              <div className="text-sm text-gray-600">总投票数</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {state.userStats?.currentStreak || 0}
              </div>
              <div className="text-sm text-gray-600">连续投票</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {state.userStats?.correctPredictions || 0}
              </div>
              <div className="text-sm text-gray-600">正确预测</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {state.userStats?.averageVoteTime ? Math.floor(state.userStats.averageVoteTime / 60) : 0}分钟
              </div>
              <div className="text-sm text-gray-600">平均用时</div>
            </CardContent>
          </Card>
        </div>

        {/* 成就区域 */}
        <Card className="bg-white rounded-xl shadow-sm mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              我的成就
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <Award className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                <div className="text-xs font-medium">首次投票</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-xs font-medium">连续投票</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg opacity-50">
                <Shield className="h-6 w-6 text-gray-400 mx-auto mb-1" />
                <div className="text-xs font-medium">投票达人</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能菜单 */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">消息通知</span>
                </div>
                <Badge className="bg-red-100 text-red-600 text-xs">3</Badge>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">设置</span>
                </div>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">帮助与反馈</span>
                </div>
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-red-600"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="h-5 w-5" />
                  <span>退出登录</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
        </>
      )}
    </MobileLayout>
  );
};

export default MobileProfilePage;