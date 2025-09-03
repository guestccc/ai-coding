// 团队相关 API 服务
import request from '../../utils/request';
import {
  Team,
  CreateTeamRequest,
  UpdateTeamRequest,
  TeamInviteRequest,
  GetTeamsParams
} from '../../types/mobile/team';
import {
  PaginatedResponse,
  ApiResponse
} from '../../types/mobile/common';
import { mockTeams, mockDelay } from './mockData';

/**
 * 获取团队列表
 */
export const getTeams = async (params?: GetTeamsParams): Promise<PaginatedResponse<Team>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockTeams,
    meta: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      total: mockTeams.length,
      totalPages: Math.ceil(mockTeams.length / (params?.limit || 20)),
      hasNext: false,
      hasPrevious: false
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/teams', { params });
};

/**
 * 创建团队
 */
export const createTeam = async (data: CreateTeamRequest): Promise<ApiResponse<Team>> => {
  // 模拟网络延迟
  await mockDelay(600);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '创建成功',
    data: {
      ...mockTeams[0],
      name: data.name,
      description: data.description || mockTeams[0].description
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/teams', data);
};

/**
 * 获取团队详情
 */
export const getTeamById = async (teamId: string): Promise<ApiResponse<Team>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockTeams[0]
  };
  
  // 真实API请求（暂时注释）
  // return request.get(`/teams/${teamId}`);
};

/**
 * 更新团队信息
 */
export const updateTeam = async (teamId: string, data: UpdateTeamRequest): Promise<ApiResponse<Team>> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '更新成功',
    data: {
      ...mockTeams[0],
      ...data
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.put(`/teams/${teamId}`, data);
};

/**
 * 删除团队
 */
export const deleteTeam = async (teamId: string): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '删除成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.delete(`/teams/${teamId}`);
};

/**
 * 邀请成员加入团队
 */
export const inviteTeamMember = async (teamId: string, data: TeamInviteRequest): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '邀请发送成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/teams/${teamId}/invite`, data);
};

/**
 * 移除团队成员
 */
export const removeTeamMember = async (teamId: string, memberId: string): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '成员移除成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.delete(`/teams/${teamId}/members/${memberId}`);
};

/**
 * 通过邀请码加入团队
 */
export const joinTeamByInviteCode = async (inviteCode: string): Promise<ApiResponse<Team>> => {
  // 模拟网络延迟
  await mockDelay(600);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '加入团队成功',
    data: mockTeams[0]
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/teams/join/${inviteCode}`);
};