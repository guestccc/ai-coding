import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Vote, 
  Calendar,
  TrendingUp,
  Award,
  Search,
  X,
  Filter,
  BarChart3,
  Download,
  ChevronUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  getVotingRecords,
  getUserVotingStats
} from '@/services/mobile/voting';
import {
  VoteRecord,
  UserVotingStats,
  GetVotingRecordsParams
} from '@/types/mobile/voting';
import MobileLayout from '@/components/mobile/MobileLayout';

// 页面状态接口
interface RecordsPageState {
  voteRecords: VoteRecord[];
  userStats: UserVotingStats | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
}

const MobileRecordsPage: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<RecordsPageState>({
    voteRecords: [],
    userStats: null,
    isLoading: true,
    isLoadingMore: false,
    error: null,
    hasMore: true,
    currentPage: 1
  });
  const [activeFilter, setActiveFilter] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);

  const filters = ['全部', '今日', '本轮', '已完成', '进行中'];

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const [recordsResponse, statsResponse] = await Promise.all([
          getVotingRecords({ page: 1, limit: 20 }),
          getUserVotingStats()
        ]);

        setState(prev => ({
          ...prev,
          isLoading: false,
          voteRecords: recordsResponse.success ? recordsResponse.data || [] : [],
          userStats: statsResponse.success ? (statsResponse.data || null) : null,
          hasMore: recordsResponse.success ? (recordsResponse.data?.length || 0) >= 20 : false,
          error: !recordsResponse.success ? (typeof recordsResponse.error === 'string' ? recordsResponse.error : '获取投票记录失败') :
                 !statsResponse.success ? (typeof statsResponse.error === 'string' ? statsResponse.error : '获取统计信息失败') : null
        }));
      } catch (error) {
        console.error('加载数据失败:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: '加载数据失败，请重试'
        }));
      }
    };

    loadData();
  }, []);

  // 加载更多数据
  const loadMoreRecords = async () => {
    if (state.isLoadingMore || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoadingMore: true }));
    
    try {
      const response = await getVotingRecords({ 
        page: state.currentPage + 1, 
        limit: 20 
      });

      if (response.success && response.data) {
        setState(prev => ({
          ...prev,
          isLoadingMore: false,
          voteRecords: [...prev.voteRecords, ...response.data!],
          currentPage: prev.currentPage + 1,
          hasMore: response.data!.length >= 20
        }));
      } else {
        setState(prev => ({
          ...prev,
          isLoadingMore: false,
          hasMore: false
        }));
      }
    } catch (error) {
      console.error('加载更多记录失败:', error);
      setState(prev => ({
        ...prev,
        isLoadingMore: false
      }));
    }
  };

  const getVoteStats = () => {
    if (state.userStats) {
      return {
        totalVotes: state.userStats.totalVotes,
        teamAVotes: Math.floor(state.userStats.totalVotes * 0.6), // 模拟数据
        teamBVotes: Math.floor(state.userStats.totalVotes * 0.4), // 模拟数据
        winRate: ((state.userStats.correctPredictions / Math.max(state.userStats.totalVotes, 1)) * 100).toFixed(1)
      };
    }
    return { totalVotes: 0, teamAVotes: 0, teamBVotes: 0, winRate: '0' };
  };

  const stats = getVoteStats();

  // 加载状态
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">加载投票记录...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (state.error && state.voteRecords.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{state.error}</p>
          <Button onClick={() => window.location.reload()}>重新加载</Button>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <header className="sticky top-0 z-100 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Vote className="h-4 w-4 text-purple-600" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">投票记录</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-1 text-sm rounded-lg ${
              activeFilter !== '全部' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Filter className="h-4 w-4 mr-1" />
            筛选
          </Button>
        </div>
        
        {/* 统计栏 */}
        <div className="px-4 py-3 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{stats.totalVotes}</div>
              <div className="text-xs text-gray-600">总投票数</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{state.userStats?.completedMatches || 0}</div>
              <div className="text-xs text-gray-600">今日投票</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.winRate}%</div>
              <div className="text-xs text-gray-600">投票准确率</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-white rounded-full h-2">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{width: `${(stats.totalVotes / 10) * 100}%`}}></div>
          </div>
        </div>
      </header>
      
      {/* 筛选和搜索区 */}
      <div className="z-90 bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-2 mb-3 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="搜索队伍名称或作品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-purple-300 focus:ring-1 focus:ring-purple-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 opacity-100 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* 记录列表区 */}
      <main className="z-10 flex-1 px-4 py-2">
        <div className="space-y-3 pb-4 max-h-full overflow-auto">
          {state.voteRecords.map((record, index) => (
            <Card key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* 记录头部 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <Badge className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full font-medium">
                    第{index + 1}轮
                  </Badge>
                  <Badge className="px-2 py-1 bg-white text-gray-600 text-xs rounded font-medium">
                    VS
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(record.votedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 text-green-500">
                    ✓
                  </div>
                  <span className="text-xs font-medium text-green-600">
                    已完成
                  </span>
                </div>
              </div>
              
              {/* 对战队伍展示 */}
              <div className="flex items-center p-4 space-x-4">
                <div className="flex-1 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {record.winnerTeamName || '队伍A'}
                    </div>
                    <div className="text-xs text-gray-500">项目名称</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    record.winnerTeamId === record.winnerTeamId
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {record.winnerTeamId === record.winnerTeamId && '✓'}
                  </div>
                </div>
                
                <div className="px-3 text-gray-400 font-bold">VS</div>
                
                <div className="flex-1 flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    record.loserTeamId === record.winnerTeamId
                      ? 'border-gray-300 bg-white'
                      : 'border-gray-300 bg-white'
                  }`}>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {record.loserTeamName || '队伍B'}
                    </div>
                    <div className="text-xs text-gray-500">项目名称</div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                    B
                  </div>
                </div>
              </div>
              
              {/* 投票详情区 */}
              {expandedRecord === record.id && (
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">投票原因</div>
                      <div className="text-gray-700">{record.reason || '经过仔细评估后的选择'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">投票时长</div>
                      <div className="text-purple-600 font-medium">{Math.floor(record.matchDuration / 60)}分钟</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 text-xs rounded-lg text-center hover:bg-gray-50 active:bg-gray-100">
                      查看详情
                    </button>
                    <button className="flex-1 py-2 bg-purple-100 text-purple-600 text-xs rounded-lg text-center hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                      重新投票
                    </button>
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                className="absolute bottom-2 right-4 w-4 h-4 text-gray-400 transform transition-transform"
              >
                <ChevronUp className={`h-4 w-4 ${expandedRecord === record.id ? 'rotate-180' : 'rotate-0'}`} />
              </button>
            </Card>
          ))}
          
          {/* 加载更多区域 */}
          <div className="py-8 text-center">
            {state.voteRecords.length === 0 ? (
              <div>
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">暂无投票记录</p>
                <Button 
                  onClick={() => navigate('/mobile/vote')}
                  className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
                >
                  开始投票
                </Button>
              </div>
            ) : state.hasMore ? (
              <Button
                onClick={loadMoreRecords}
                disabled={state.isLoadingMore}
                variant="ghost"
                className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                {state.isLoadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    加载中...
                  </>
                ) : (
                  '加载更多'
                )}
              </Button>
            ) : (
              <p className="text-gray-500 text-sm">已加载全部记录</p>
            )}
          </div>
        </div>

        {/* 成就卡片 */}
        <Card className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">投票成就</h3>
              <p className="text-sm text-gray-600">解锁的成就徽章</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Vote className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">首次投票</div>
              <div className="text-xs text-gray-600">已完成</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">连续投票</div>
              <div className="text-xs text-gray-600">{state.userStats?.currentStreak || 0}次</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-sm font-medium text-gray-900">高胜率</div>
              <div className="text-xs text-gray-600">{stats.winRate}%</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-50">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Vote className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-sm font-medium text-gray-500">投票达人</div>
              <div className="text-xs text-gray-500">待解锁</div>
            </div>
          </div>
        </Card>
      </main>
      
      {/* 浮动操作按钮 */}
      <div className="z-60 fixed bottom-24 right-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 bg-purple-500 rounded-full shadow-lg flex items-center justify-center mb-3 hover:bg-purple-600 hover:shadow-xl active:bg-purple-700 active:scale-95 transition-all"
        >
          <BarChart3 className="h-5 w-5 text-white" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-12 h-12 bg-blue-500 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 hover:shadow-xl active:bg-blue-700 active:scale-95 transition-all"
        >
          <Download className="h-5 w-5 text-white" />
        </Button>
        
        {showScrollTop && (
          <Button
            variant="ghost"
            size="sm"
            className="w-12 h-12 bg-gray-500 rounded-full shadow-lg flex items-center justify-center mt-3 opacity-100 hover:bg-gray-600 transition-all"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="h-5 w-5 text-white" />
          </Button>
        )}
      </div>
      </div>
    </MobileLayout>
  );
};

export default MobileRecordsPage;
