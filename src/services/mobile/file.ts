// 文件相关 API 服务
import request from '../../utils/request';
import {
  FileUploadParams
} from '../../types/mobile/file';
import {
  FileInfo,
  UploadResponse
} from '../../types/mobile/common';
import {
  ApiResponse
} from '../../types/mobile/common';
import { mockDelay } from './mockData';

/**
 * 上传文件
 */
export const uploadFiles = async (data: FileUploadParams): Promise<UploadResponse> => {
  // 模拟网络延迟
  await mockDelay(1500);
  
  // 模拟文件上传响应
  const mockFiles: FileInfo[] = data.files.map((file: File, index: number) => ({
    id: `file_${Date.now()}_${index}`,
    name: file.name,
    originalName: file.name,
    type: file.type,
    size: file.size,
    url: `https://mock-cdn.example.com/files/${file.name}`,
    ownerId: data.ownerId || 'user_123',
    ownerType: data.ownerType || 'user',
    isPublic: data.isPublic || false,
    uploadedAt: new Date().toISOString()
  }));
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '上传成功',
    files: mockFiles
  };
  
  // 真实API请求（暂时注释）
  // const formData = new FormData();
  // data.files.forEach((file: File) => {
  //   formData.append('files', file);
  // });
  // if (data.ownerId) formData.append('ownerId', data.ownerId);
  // if (data.ownerType) formData.append('ownerType', data.ownerType);
  // if (data.isPublic !== undefined) formData.append('isPublic', data.isPublic.toString());
  // return request.post('/files/upload', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' }
  // });
};

/**
 * 获取文件信息
 */
export const getFileInfo = async (fileId: string): Promise<ApiResponse<FileInfo>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: {
      id: fileId,
      name: 'example.jpg',
      originalName: 'example.jpg',
      type: 'image/jpeg',
      size: 1024000,
      url: `https://mock-cdn.example.com/files/${fileId}.jpg`,
      ownerId: 'user_123',
      ownerType: 'user',
      isPublic: true,
      uploadedAt: '2024-01-15T10:00:00Z'
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get(`/files/${fileId}`);
};

/**
 * 删除文件
 */
export const deleteFile = async (fileId: string): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '删除成功'
  };
  
  // 真实API请求（暂时泣释）
  // return request.delete(`/files/${fileId}`);
};