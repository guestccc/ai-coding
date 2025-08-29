import request from '../utils/request';
import { ApiResponse, HomeData, UserInfo } from '../types/api';

// 首页相关接口
export const homeApi = {
  // 获取首页数据
  getHomeData: (): Promise<ApiResponse<HomeData>> => {
    return request.get('/api/home/data');
  },
  
  // 获取用户信息
  getUserInfo: (): Promise<ApiResponse<UserInfo>> => {
    return request.get('/api/user/info');
  },
  
  // 获取统计数据
  getStatistics: (): Promise<ApiResponse<any>> => {
    return request.get('/api/home/statistics');
  }
};
