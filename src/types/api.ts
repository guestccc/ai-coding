// API响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

// 首页数据类型
export interface HomeData {
  title: string;
  description: string;
  features: string[];
  stats: {
    users: number;
    projects: number;
    downloads: number;
  };
}

// 用户信息类型
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

// CCC页面数据类型
export interface CccData {
  id: string;
  name: string;
  status: string;
  config: Record<string, any>;
}

// CCC表单数据类型
export interface CccFormData {
  name: string;
  description: string;
  config: Record<string, any>;
}

// 系统配置类型
export interface SystemConfig {
  version: string;
  environment: string;
  features: Record<string, boolean>;
}

// 文件上传响应类型
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}
