// 通用类型定义

/**
 * 基础 API 响应模型
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details: string;
  };
}

/**
 * 分页元数据
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * 验证错误
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

/**
 * 错误响应
 */
export interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details: string;
    validationErrors?: ValidationError[];
    timestamp: string;
    requestId: string;
  };
}

/**
 * 文件信息
 */
export interface FileInfo {
  id: string;
  name: string;
  originalName: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  ownerId: string;
  ownerType: 'user' | 'team' | 'project';
  isPublic: boolean;
  uploadedAt: string;
}

/**
 * 上传响应
 */
export interface UploadResponse {
  success: boolean;
  files: FileInfo[];
  message: string;
}
