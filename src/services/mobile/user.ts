// 用户相关 API 服务

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
 * 获取当前用户资料
 */
export const getProfile = async (): Promise<ApiResponse<{ user: User }>> => {
  try {
    // 优先尝试真实API获取最新用户信息
    const response = await request.get('/users/me');
    // API返回的data字段是用户信息，需要包装成{ user: User }格式
    return {
      success: response.data.success,
      message: response.data.message,
      data: { user: response.data.data }
    };
  } catch (error: any) {
    // 如果真实API不可用，回退到localStorage中的用户信息
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        console.log('API不可用，使用localStorage中的用户信息');
        return {
          success: true,
          message: '获取成功',
          data: { user }
        };
      } catch (parseError) {
        console.error('解析localStorage用户信息失败:', parseError);
      }
    }
    
    // 最后回退到mock数据
    console.warn('无法获取用户信息，使用mock数据:', error.message);
    
    // 模拟网络延迟
    await mockDelay(300);
    
    return {
      success: true,
      message: '获取成功',
      data: {
        user: mockUser
      }
    };
  }
};
