import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// 创建axios实例
const request: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://api.aihackathon.com/v1'
    : process.env.NODE_ENV === 'staging'
    ? 'https://staging-api.aihackathon.com/v1'
    : 'http://192.168.2.14:3001/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加token等认证信息
    console.log('发送请求:', config.url);
    
    // 添加通用请求头
    if (config.headers) {
      config.headers['Accept'] = 'application/json, text/plain, */*';
      config.headers['Accept-Language'] = 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7';
    }
    
    // 添加 JWT 认证头
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('收到响应:', response.config.url);
    return response;
  },
  (error: any) => {
    console.error('响应拦截器错误:', error);
    
    // 处理 401 未授权错误
    if (error.response?.status === 401) {
      // 清除本地存储的 token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // 重定向到登录页
      window.location.href = '/mobile/login';
      console.warn('用户未授权，请重新登录');
    }
    
    // 统一错误处理
    if (error.response) {
      // 服务器返回错误状态码
      const { status, data } = error.response;
      console.error(`HTTP ${status}:`, data);
    } else if (error.request) {
      // 请求已发出但没有收到响应
      console.error('网络错误:', error.message);
    } else {
      // 其他错误
      console.error('请求配置错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default request;
