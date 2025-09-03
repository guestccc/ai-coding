import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  ExternalLink, 
  Check,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  getPKTask,
  submitVote
} from '@/services/mobile/voting';
import { 
  PKMatch, 
  VoteSubmissionRequest,
  PKTaskResponse,
  VoteSubmissionResponse
} from '@/types/mobile/voting';
import MobileLayout from '@/components/mobile/MobileLayout';

// 投票页面状态
interface VotingPageState {
  currentPK: PKMatch | null;
  selectedTeam: string | null;
  isLoading: boolean;
  isSubmitting: boolean;
  currentView: 'teamA' | 'teamB' | 'comparison';
  showConfirmDialog: boolean;
  videoPlayingState: {
    teamA: boolean;
    teamB: boolean;
  };
  linkOpenState: {
    teamA: boolean;
    teamB: boolean;
  };
  error: string | null;
  lockId: string | null;
  expiresAt: string | null;
}

const MobileVotePage: React.FC = () => {
  const navigate = useNavigate();
  const [votingState, setVotingState] = useState<VotingPageState>({
    currentPK: null,
    selectedTeam: null,
    isLoading: true,
    isSubmitting: false,
    currentView: 'comparison',
    showConfirmDialog: false,
    videoPlayingState: {
      teamA: false,
      teamB: false
    },
    linkOpenState: {
      teamA: false,
      teamB: false
    },
    error: null,
    lockId: null,
    expiresAt: null
  });

  // 加载PK任务
  useEffect(() => {
    const loadPKTask = async () => {
      setVotingState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        const response = await getPKTask();
        
        if (response.success && response.pk) {
          setVotingState(prev => ({ 
            ...prev, 
            isLoading: false,
            currentPK: response.pk!,
            lockId: response.lockId || null,
            expiresAt: response.expiresAt || null
          }));
        } else {
        setVotingState(prev => ({ 
          ...prev, 
          isLoading: false,
            error: response.error || '暂无可用的PK任务'
        }));
        }
      } catch (error) {
        console.error('加载PK任务失败:', error);
        setVotingState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: '加载PK任务失败，请重试'
        }));
      }
    };

    loadPKTask();
  }, []);

  const handleSelectTeam = (team: 'A' | 'B') => {
    const teamId = team === 'A' ? votingState.currentPK?.teamA.id : votingState.currentPK?.teamB.id;
    setVotingState(prev => ({ ...prev, selectedTeam: teamId || null }));
  };

  const handleSubmitVote = async () => {
    if (!votingState.selectedTeam || !votingState.currentPK || !votingState.lockId) return;

    setVotingState(prev => ({ ...prev, isSubmitting: true, error: null }));
    
    try {
      const voteData: VoteSubmissionRequest = {
        pkId: votingState.currentPK.id,
        winnerTeamId: votingState.selectedTeam,
        confidence: 'high',
        reason: '经过仔细体验和评估后的选择',
        lockId: votingState.lockId
      };

      const response = await submitVote(voteData);
      
      if (response.success) {
      setVotingState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        showConfirmDialog: true 
      }));

      // 3秒后跳转到投票记录页
      setTimeout(() => {
        navigate('/mobile/records');
      }, 3000);
      } else {
        setVotingState(prev => ({ 
          ...prev, 
          isSubmitting: false,
          error: response.error || '投票提交失败'
        }));
      }
      
    } catch (error) {
      console.error('投票提交失败:', error);
      setVotingState(prev => ({ 
        ...prev, 
        isSubmitting: false,
        error: '投票提交失败，请重试'
      }));
    }
  };

  const handleVideoToggle = (team: 'A' | 'B') => {
    setVotingState(prev => ({
      ...prev,
      videoPlayingState: {
        ...prev.videoPlayingState,
        [team === 'A' ? 'teamA' : 'teamB']: !prev.videoPlayingState[team === 'A' ? 'teamA' : 'teamB']
      }
    }));
  };

  const handleLinkOpen = (team: 'A' | 'B') => {
    const projectData = team === 'A' ? votingState.currentPK?.projectA : votingState.currentPK?.projectB;
    if (projectData?.experienceUrl) {
      window.open(projectData.experienceUrl, '_blank');
      setVotingState(prev => ({
        ...prev,
        linkOpenState: {
          ...prev.linkOpenState,
          [team === 'A' ? 'teamA' : 'teamB']: true
        }
      }));
    }
  };

  const handleViewSwitch = (view: 'teamA' | 'teamB' | 'comparison') => {
    setVotingState(prev => ({ ...prev, currentView: view }));
  };

  if (votingState.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">正在加载PK任务...</p>
        </div>
      </div>
    );
  }

  if (votingState.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{votingState.error}</p>
          <Button onClick={() => navigate('/mobile')}>返回首页</Button>
        </div>
      </div>
    );
  }

  if (!votingState.currentPK) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">暂无可投票的PK任务</p>
          <Button onClick={() => navigate('/mobile')}>返回首页</Button>
        </div>
      </div>
    );
  }

  const { teamA, teamB } = votingState.currentPK;

  return (
    <MobileLayout>
      <div className="min-h-screen bg-gray-50">
      {/* 投票头部 */}
      <header className="sticky top-0 z-100 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button
            onClick={() => navigate('/mobile')}
            variant="ghost"
            size="sm"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <h1 className="flex-1 text-center font-bold text-lg">PK投票</h1>
          <div className="text-sm text-gray-500">3/5</div>
        </div>
        
        {/* PK信息栏 */}
        <div className="bg-blue-50 px-4 py-3 border-b">
          <div className="text-center text-blue-800 font-medium mb-2">
            第 {votingState.currentPK?.roundId || '当前'} 轮 PK
          </div>
          <div className="mx-auto w-12 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800">
            VS
          </div>
        </div>
      </header>

      {/* 作品对比区域 */}
      <main className="flex-1 relative px-4 py-6">
          {/* 切换指示器 */}
        <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => handleViewSwitch('teamA')}
                className={`w-3 h-3 rounded-full transition-colors ${
                votingState.currentView === 'teamA' ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
              <button
                onClick={() => handleViewSwitch('teamB')}
                className={`w-3 h-3 rounded-full transition-colors ${
                votingState.currentView === 'teamB' ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            </div>
          </div>

          {/* 作品A展示卡 */}
        {(votingState.currentView === 'teamA' || votingState.currentView === 'comparison') && (
          <Card className="w-full mb-4 bg-white rounded-2xl shadow-lg">
              <CardHeader className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{teamA.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{teamA.members.length} 名成员</p>
                    <Badge className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                      {votingState.currentPK?.projectA.techStack?.[0] || 'AI'}
                    </Badge>
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      votingState.selectedTeam === teamA.id 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    onClick={() => handleSelectTeam('A')}
                  >
                    {votingState.selectedTeam === teamA.id && <Check className="h-4 w-4" />}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{votingState.currentPK?.projectA.title}</h4>
              </CardHeader>

              <CardContent className="flex-1 p-6 overflow-auto">
                {/* 演示视频区 */}
                <div className="mb-6">
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Button
                        onClick={() => handleVideoToggle('A')}
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        {votingState.videoPlayingState.teamA ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">演示视频</p>
                </div>

                {/* 体验链接区 */}
                <div className="mb-6">
                  <Button
                    onClick={() => handleLinkOpen('A')}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    体验作品
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    点击在新窗口打开体验链接
                  </p>
                </div>

                {/* 项目描述区 */}
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-4">{votingState.currentPK?.projectA.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(votingState.currentPK?.projectA.techStack || []).map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* 评分区域 */}
              <div className="p-6 bg-gray-50 rounded-b-2xl">
                <h5 className="text-sm font-medium text-gray-700 mb-3">评分维度</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">创新性</div>
                    <div className="text-xs text-gray-500">9.2</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">实用性</div>
                    <div className="text-xs text-gray-500">8.8</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">技术性</div>
                    <div className="text-xs text-gray-500">9.0</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">完成度</div>
                    <div className="text-xs text-gray-500">8.5</div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 作品B展示卡 */}
        {(votingState.currentView === 'teamB' || votingState.currentView === 'comparison') && (
          <Card className="w-full mb-4 bg-white rounded-2xl shadow-lg">
              <CardHeader className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">B</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{teamB.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{teamB.members.length} 名成员</p>
                    <Badge className="inline-block px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                      {votingState.currentPK?.projectB.techStack?.[0] || 'Web'}
                    </Badge>
                  </div>
                  <div 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      votingState.selectedTeam === teamB.id 
                        ? 'border-red-500 bg-red-500 text-white' 
                        : 'border-gray-300 bg-white hover:border-red-300 hover:bg-red-50'
                    }`}
                    onClick={() => handleSelectTeam('B')}
                  >
                    {votingState.selectedTeam === teamB.id && <Check className="h-4 w-4" />}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800">{votingState.currentPK?.projectB.title}</h4>
              </CardHeader>

              <CardContent className="flex-1 p-6 overflow-auto">
                {/* 演示视频区 */}
                <div className="mb-6">
                  <div className="w-full aspect-video bg-black rounded-lg overflow-hidden relative">
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Button
                        onClick={() => handleVideoToggle('B')}
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        {votingState.videoPlayingState.teamB ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">演示视频</p>
                </div>

                {/* 体验链接区 */}
                <div className="mb-6">
                  <Button
                    onClick={() => handleLinkOpen('B')}
                    className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    体验作品
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    点击在新窗口打开体验链接
                  </p>
                </div>

                {/* 项目描述区 */}
                <div className="text-sm text-gray-700 leading-relaxed">
                  <p className="mb-4">{votingState.currentPK?.projectB.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(votingState.currentPK?.projectB.techStack || []).map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              {/* 评分区域 */}
              <div className="p-6 bg-gray-50 rounded-b-2xl">
                <h5 className="text-sm font-medium text-gray-700 mb-3">评分维度</h5>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">创新性</div>
                    <div className="text-xs text-gray-500">8.8</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">实用性</div>
                    <div className="text-xs text-gray-500">9.2</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">技术性</div>
                    <div className="text-xs text-gray-500">8.5</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium">完成度</div>
                    <div className="text-xs text-gray-500">9.0</div>
                  </div>
                </div>
              </div>
            </Card>
          )}
      </main>

      {/* 投票操作区 */}
      <footer className="fixed bottom-20 w-full bg-white border-t shadow-lg safe-area-pb">
        {/* 投票按钮组 */}
        <div className="flex space-x-4 p-4">
          <Button
            onClick={() => handleSelectTeam('A')}
            disabled={votingState.isSubmitting}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              votingState.selectedTeam === teamA.id
                ? 'bg-blue-600 ring-4 ring-blue-200 text-white'
                : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg active:bg-blue-700 active:scale-95 text-white'
            } ${votingState.isSubmitting ? 'bg-gray-300 cursor-not-allowed text-gray-600' : ''}`}
          >
            选择队伍A
          </Button>
          
          <Button
            onClick={() => handleSelectTeam('B')}
            disabled={votingState.isSubmitting}
            className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all ${
              votingState.selectedTeam === teamB.id
                ? 'bg-red-600 ring-4 ring-red-200 text-white'
                : 'bg-red-500 hover:bg-red-600 hover:shadow-lg active:bg-red-700 active:scale-95 text-white'
            } ${votingState.isSubmitting ? 'bg-gray-300 cursor-not-allowed text-gray-600' : ''}`}
          >
            选择队伍B
          </Button>
        </div>

        {/* 提交确认区 */}
        <div className="px-4 pb-4">
          <div className="text-center text-sm text-gray-600 mb-3">
            {votingState.selectedTeam 
              ? `已选择队伍${votingState.selectedTeam === teamA.id ? 'A' : 'B'}，请确认提交投票`
              : '请选择您支持的队伍'
            }
          </div>
          
          <Button
            onClick={handleSubmitVote}
            disabled={!votingState.selectedTeam || votingState.isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {votingState.isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                提交中...
              </>
            ) : (
              '提交投票'
            )}
          </Button>
        </div>
        <div className="pb-safe"></div>
      </footer>

      {/* 投票成功提示 */}
      {votingState.showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">投票成功！</h3>
            <p className="text-gray-600 mb-4">您的投票已成功提交，感谢参与！</p>
            <Button onClick={() => navigate('/mobile/records')} className="w-full">
              查看投票记录
            </Button>
          </div>
        </div>
      )}
      </div>
    </MobileLayout>
  );
};

export default MobileVotePage;
