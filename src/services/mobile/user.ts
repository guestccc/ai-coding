// 用户相关 API 服务
// 注意：大部分用户相关操作在 auth.ts 中，这里主要是一些管理员功能

import request from '../../utils/request';
import {
  User,
  UserRole
} from '../../types/mobile/auth';
import {
  PaginatedResponse,
  ApiResponse
} from '../../types/mobile/common';
import { mockUser, mockDelay } from './mockData';

/**
 * 管理员获取用户列表
 */
export const adminGetUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}): Promise<PaginatedResponse<User>> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: [mockUser],
    meta: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      total: 1,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/admin/users', { params });
};

/**
 * 管理员切换用户状态
 */
export const adminToggleUserStatus = async (userId: string): Promise<ApiResponse<User>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '状态切换成功',
    data: {
      ...mockUser,
      isActive: !mockUser.isActive
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/admin/users/${userId}/toggle-status`);
};