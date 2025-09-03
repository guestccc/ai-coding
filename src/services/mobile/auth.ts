// 认证相关 API 服务
import request from '../../utils/request';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  UpdateProfileRequest,
  User
} from '../../types/mobile/auth';
import {
  ApiResponse
} from '../../types/mobile/common';
import { mockUser, mockDelay } from './mockData';

/**
 * 用户登录
 */
export const login = async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
  // 模拟网络延迟
  await mockDelay(800);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '登录成功',
    data: {
      user: mockUser,
      token: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/auth/login', data);
};

/**
 * 用户注册
 */
export const register = async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
  // 模拟网络延迟
  await mockDelay(1000);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '注册成功',
    data: {
      user: {
        ...mockUser,
        email: data.email,
        name: data.name
      },
      token: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/auth/register', data);
};

/**
 * 用户登出
 */
export const logout = async (): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '登出成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/auth/logout');
};

/**
 * 刷新访问令牌
 */
export const refreshToken = async (data: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '令牌刷新成功',
    data: {
      token: `mock_access_token_${Date.now()}`,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString()
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/auth/refresh', data);
};

/**
 * 获取当前用户信息
 */
export const getProfile = async (): Promise<ApiResponse<{ user: User }>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: {
      user: mockUser
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/auth/profile');
};

/**
 * 更新用户信息
 */
export const updateProfile = async (data: UpdateProfileRequest): Promise<ApiResponse<{ user: User }>> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '更新成功',
    data: {
      user: {
        ...mockUser,
        ...data
      }
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.put('/auth/profile', data);
};