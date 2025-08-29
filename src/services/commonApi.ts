import request from '../utils/request';

// 通用接口
export const commonApi = {
  // 上传文件
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  // 获取系统配置
  getSystemConfig: () => {
    return request.get('/api/system/config');
  },
  
  // 获取版本信息
  getVersion: () => {
    return request.get('/api/system/version');
  },
  
  // 健康检查
  healthCheck: () => {
    return request.get('/api/health');
  }
};
