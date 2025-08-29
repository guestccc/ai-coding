import request from '../utils/request';
import { ApiResponse, CccData, CccFormData } from '../types/api';

// CCC页面相关接口
export const cccApi = {
  // 获取灰度开关
  getGraySwitch: () => {
    return request.get('https://test-mt.myscrm.com.cn/v1-ai-ad-bff/vCommon/graySwitch');
  },
  
  // 获取CCC页面数据
  getCccData: (): Promise<ApiResponse<CccData>> => {
    return request.get('/api/ccc/data');
  },
  
  // 提交CCC表单
  submitCccForm: (data: CccFormData): Promise<ApiResponse<any>> => {
    return request.post('/api/ccc/submit', data);
  },
  
  // 获取CCC配置
  getCccConfig: (): Promise<ApiResponse<any>> => {
    return request.get('/api/ccc/config');
  }
};
