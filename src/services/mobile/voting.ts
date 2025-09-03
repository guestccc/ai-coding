// 投票相关 API 服务
import request from '../../utils/request';
import {
  PKTaskResponse,
  VoteSubmissionRequest,
  VoteSubmissionResponse,
  VoteRecord,
  VotingStats,
  UserVotingStats,
  LeaderboardItem,
  GetVotingRecordsParams,
  GetLeaderboardParams
} from '../../types/mobile/voting';
import {
  PaginatedResponse,
  ApiResponse
} from '../../types/mobile/common';

// Mock 数据导入
import {
  mockPKMatch,
  mockUserVotingStats,
  mockVotingStats,
  mockLeaderboard,
  mockVoteRecords,
  mockDelay
} from './mockData';

/**
 * 获取PK投票任务
 */
export const getPKTask = async (preferredCategory?: string): Promise<PKTaskResponse> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    pk: mockPKMatch,
    lockId: `lock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10分钟后过期
    remainingTime: 10 * 60 // 10分钟
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/voting/pk-task', { 
  //   params: { preferredCategory } 
  // });
};

/**
 * 提交投票
 */
export const submitVote = async (data: VoteSubmissionRequest): Promise<VoteSubmissionResponse> => {
  // 模拟网络延迟
  await mockDelay(800);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    voteRecord: {
      id: `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      pkId: data.pkId,
      judgeId: 'user_001',
      winnerTeamId: data.winnerTeamId,
      loserTeamId: data.winnerTeamId === 'team_001' ? 'team_002' : 'team_001',
      winnerTeamName: data.winnerTeamId === 'team_001' ? 'AI创新先锋' : 'AI探索者',
      loserTeamName: data.winnerTeamId === 'team_001' ? 'AI探索者' : 'AI创新先锋',
      reason: data.reason || '综合评估后的选择',
      confidence: data.confidence || 'medium',
      matchDuration: 180,
      votedAt: new Date().toISOString(),
      lockExpiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/voting/submit', data);
};

/**
 * 获取投票记录
 */
export const getVotingRecords = async (params?: GetVotingRecordsParams): Promise<PaginatedResponse<VoteRecord>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockVoteRecords,
    meta: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      total: mockVoteRecords.length,
      totalPages: Math.ceil(mockVoteRecords.length / (params?.limit || 20)),
      hasNext: false,
      hasPrevious: false
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/voting/records', { params });
};

/**
 * 获取个人投票统计
 */
export const getUserVotingStats = async (): Promise<ApiResponse<UserVotingStats>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockUserVotingStats
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/voting/stats');
};

/**
 * 获取实时排行榜
 */
export const getLeaderboard = async (params?: GetLeaderboardParams): Promise<ApiResponse<LeaderboardItem[]>> => {
  // 模拟网络延迟
  await mockDelay(600);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockLeaderboard
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/voting/leaderboard', { params });
};

/**
 * 获取系统投票统计
 */
export const getSystemVotingStats = async (): Promise<ApiResponse<VotingStats>> => {
  // 模拟网络延迟
  await mockDelay(350);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockVotingStats
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/voting/system-stats');
};