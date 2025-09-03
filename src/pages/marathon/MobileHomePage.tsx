import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw,
  Users,
  TrendingUp,
  Clock,
  Award,
  Play,
  ExternalLink,
  User,
  Vote,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  getLeaderboard,
  getSystemVotingStats,
  getUserVotingStats
} from '@/services/mobile/voting';
import { 
  getCurrentCompetition
} from '@/services/mobile/competition';
import { 
  UserVotingStats,
  VotingStats,
  LeaderboardItem
} from '@/types/mobile/voting';
import { Competition } from '@/types/mobile/competition';
import { ApiResponse } from '@/types/mobile/common';
import MobileLayout from '@/components/mobile/MobileLayout';

// 状态管理
interface HomePageState {
  userStats: UserVotingStats | null;
  systemStats: VotingStats | null;
  leaderboard: LeaderboardItem[];
  competition: Competition | null;
  loading: boolean;
  refreshing: boolean;
  countdown: string;
}

const MobileHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<HomePageState>({
    userStats: null,
    systemStats: null,
    leaderboard: [],
    competition: null,
    loading: true,
    refreshing: false,
    countdown: ''
  });

  // 加载数据
  const loadData = async (isRefresh = false) => {
    try {
      setState(prev => ({ ...prev, loading: !isRefresh, refreshing: isRefresh }));
      
      const [userStatsRes, systemStatsRes, leaderboardRes, competitionRes] = await Promise.all([
        getUserVotingStats(),
        getSystemVotingStats(),
        getLeaderboard(),
        getCurrentCompetition()
      ]);

      setState(prev => ({
        ...prev,
        userStats: userStatsRes.data || null,
        systemStats: systemStatsRes.data || null,
        leaderboard: leaderboardRes.data || [],
        competition: competitionRes.data || null,
        loading: false,
        refreshing: false
      }));
    } catch (error) {
      console.error('加载数据失败:', error);
      setState(prev => ({ ...prev, loading: false, refreshing: false }));
    }
  };

  // 刷新数据
  const handleRefresh = () => {
    loadData(true);
  };

  // 计算倒计时
  const calculateCountdown = () => {
    if (!state.competition) return '';
    
    const now = new Date();
    const end = new Date(state.competition.endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return '比赛已结束';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}天${hours}小时`;
    if (hours > 0) return `${hours}小时${minutes}分钟`;
    return `${minutes}分钟`;
  };

  // 初始化
  useEffect(() => {
    loadData();
  }, []);

  // 倒计时更新
  useEffect(() => {
    const timer = setInterval(() => {
      setState(prev => ({ ...prev, countdown: calculateCountdown() }));
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, [state.competition]);

  // 计算进度百分比
  const getProgressPercentage = () => {
    if (!state.competition) return 0;
    return (state.competition.completedRounds / state.competition.totalRounds) * 100;
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">AI黑客松</h1>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
        
        {/* 状态指示器 */}
        <div className="px-4 py-2 bg-green-100 text-green-800 text-sm">
          <div className="flex items-center justify-between">
            <Badge className="rounded-full px-3 py-1 bg-green-500 text-white">
              进行中
            </Badge>
            <div className="font-mono text-xs">
              {state.countdown || '计算中...'}
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1">
        {/* 快速操作卡片区 */}
        <div className="p-4 space-y-4">
          {/* 评委投票卡片 */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">评委投票</h3>
                  <Badge className="mt-1 px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                    进行中
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {state.userStats?.totalVotes || 0}
                  </div>
                  <div className="text-sm text-gray-600">已投票数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {state.userStats?.pendingMatches || 0}
                  </div>
                  <div className="text-sm text-gray-600">待投票数</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/mobile/vote')}
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                开始投票
              </Button>
            </CardContent>
          </Card>

          {/* 队伍管理卡片 */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">作品管理</h3>
                  <Badge className="mt-1 px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                    可编辑
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">作品版本</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">已发布</div>
                  <div className="text-sm text-gray-600">当前状态</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/mobile/projects')}
                className="w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              >
                管理作品
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 实时数据展示区 */}
        <div className="px-4 pb-4">
          {/* 排行榜卡片 */}
          <Card className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">实时排行榜</h2>
              <Button
                onClick={handleRefresh}
                variant="ghost"
                size="sm"
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                disabled={state.refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${state.refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            <div className="space-y-3">
              {state.leaderboard.slice(0, 3).map((item, index) => (
                <div key={item.team.id} className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                    {item.rank}
                  </div>
                  <div className="flex-1 ml-3">
                    <div className="font-semibold text-gray-900">{item.team.name}</div>
                    <div className="text-sm text-gray-600">{item.project.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{item.totalVotes}</div>
                    <div className="text-xs text-gray-500">胜率 {(item.winRate * 100).toFixed(0)}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 赛程进度卡片 */}
          <Card className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                第 {state.competition?.completedRounds || 0} 轮 PK
              </h3>
              <Progress value={getProgressPercentage()} className="w-full h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {state.systemStats?.activeJudges || 0}
                </div>
                <div className="text-xs text-gray-600">在线评委</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {state.systemStats?.totalVotes || 0}
                </div>
                <div className="text-xs text-gray-600">总投票数</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      </div>
    </MobileLayout>
  );
};

export default MobileHomePage;
