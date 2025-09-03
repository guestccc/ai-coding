// 比赛相关 API 服务
import request from '../../utils/request';
import {
  Competition,
  CompetitionProgress
} from '../../types/mobile/competition';
import {
  ApiResponse
} from '../../types/mobile/common';
import { mockCompetition, mockDelay } from './mockData';

/**
 * 获取当前比赛信息
 */
export const getCurrentCompetition = async (): Promise<ApiResponse<Competition>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockCompetition
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/competitions/current');
};

/**
 * 获取比赛进度详情
 */
export const getCompetitionProgress = async (competitionId?: string): Promise<ApiResponse<CompetitionProgress>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: {
      competition: mockCompetition,
      votingStats: {
        totalJudges: 500,
        activeJudges: 342,
        totalVotes: 2847,
        averageVoteTime: 42.5,
        completionRate: 85.6
      }
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get(`/competitions/${competitionId || 'current'}/progress`);
};