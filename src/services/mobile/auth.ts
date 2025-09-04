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
  try {
    // 真实API请求
    const response = await request.post('/auth/login', data);
    // API已经返回标准格式，直接返回
    return response.data;
  } catch (error: any) {
    // 如果真实API不可用，回退到mock数据
    console.warn('真实API不可用，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(800);
    
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
  }
};

/**
 * 用户注册
 */
export const register = async (data: RegisterRequest): Promise<ApiResponse<AuthResponse>> => {
  try {
    // 真实API请求
    const response = await request.post('/auth/register', data);
    // API已经返回标准格式，直接返回
    return response.data;
  } catch (error: any) {
    // 处理API错误响应
    if (error.response && error.response.data) {
      // 如果API返回错误信息，直接返回
      return error.response.data;
    }
    
    // 如果真实API不可用，回退到mock数据
    console.warn('真实API不可用，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(1000);
    
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
  }
};

/**
 * 用户登出
 */
export const logout = async (): Promise<ApiResponse> => {
  try {
    // 真实API请求
    const response = await request.post('/auth/logout');
    // API已经返回标准格式，直接返回
    return response.data;
  } catch (error: any) {
    // 如果真实API不可用，回退到mock数据
    console.warn('真实API不可用，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(300);
    
    return {
      success: true,
      message: '登出成功'
    };
  }
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

/**
 * 忘记密码 - 发送重置邮件
 */
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    // 真实API请求
    const response = await request.post('/auth/forgot-password', { email });
    // API已经返回标准格式，直接返回
    return response.data;
  } catch (error: any) {
    // 如果真实API不可用，回退到mock数据
    console.warn('真实API不可用，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(1200);
    
    return {
      success: true,
      message: '重置密码的邮件已发送到您的邮箱，请检查邮件并按照指引重置密码'
    };
  }
};

/**
 * 重置密码
 */
export const resetPassword = async (token: string, newPassword: string): Promise<ApiResponse> => {
  try {
    // 真实API请求
    const response = await request.post('/auth/reset-password', { token, password: newPassword });
    // API已经返回标准格式，直接返回
    return response.data;
  } catch (error: any) {
    // 如果真实API不可用，回退到mock数据
    console.warn('真实API不可用，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(800);
    
    return {
      success: true,
      message: '密码重置成功，请使用新密码登录'
    };
  }
};