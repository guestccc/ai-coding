// 文件相关类型定义

/**
 * 文件所有者类型
 */
export type FileOwnerType = 'user' | 'team' | 'project';

/**
 * 文件上传请求参数
 */
export interface FileUploadParams {
  files: File[];
  ownerId?: string;
  ownerType?: FileOwnerType;
  isPublic?: boolean;
}

/**
 * 文件上传表单数据
 */
export interface FileUploadFormData {
  files: File[];
  ownerId?: string;
  ownerType?: FileOwnerType;
  isPublic?: boolean;
}
