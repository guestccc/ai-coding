// 项目相关 API 服务
import request from '../../utils/request';
import {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  ProjectVersion,
  GetProjectsParams
} from '../../types/mobile/project';
import {
  PaginatedResponse,
  ApiResponse
} from '../../types/mobile/common';
import { mockProjects, mockDelay } from './mockData';

/**
 * 获取项目列表
 */
export const getProjects = async (params?: GetProjectsParams): Promise<PaginatedResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockProjects,
    meta: {
      page: params?.page || 1,
      limit: params?.limit || 20,
      total: mockProjects.length,
      totalPages: Math.ceil(mockProjects.length / (params?.limit || 20)),
      hasNext: false,
      hasPrevious: false
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.get('/projects', { params });
};

/**
 * 创建项目
 */
export const createProject = async (data: CreateProjectRequest): Promise<ApiResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(600);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '创建成功',
    data: {
      ...mockProjects[0],
      title: data.title,
      description: data.description || mockProjects[0].description
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post('/projects', data);
};

/**
 * 获取项目详情
 */
export const getProjectById = async (projectId: string): Promise<ApiResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(300);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '获取成功',
    data: mockProjects[0]
  };
  
  // 真实API请求（暂时注释）
  // return request.get(`/projects/${projectId}`);
};

/**
 * 更新项目信息
 */
export const updateProject = async (projectId: string, data: UpdateProjectRequest): Promise<ApiResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '更新成功',
    data: {
      ...mockProjects[0],
      ...data,
      updatedAt: new Date().toISOString()
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.put(`/projects/${projectId}`, data);
};

/**
 * 删除项目
 */
export const deleteProject = async (projectId: string): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '删除成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.delete(`/projects/${projectId}`);
};

/**
 * 发布项目
 */
export const publishProject = async (projectId: string): Promise<ApiResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(500);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '发布成功',
    data: {
      ...mockProjects[0],
      status: 'published'
    }
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/projects/${projectId}/publish`);
};

/**
 * 取消发布项目
 */
export const unpublishProject = async (projectId: string): Promise<ApiResponse> => {
  // 模拟网络延迟
  await mockDelay(400);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '取消发布成功'
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/projects/${projectId}/unpublish`);
};

/**
 * 获取项目版本历史
 */
export const getProjectVersions = async (projectId: string): Promise<ApiResponse<ProjectVersion[]>> => {
  // 模拟网络延迟
  await mockDelay(350);
  
  // 直接返回mock数据作为API响应
  const mockVersions: ProjectVersion[] = [
    {
      id: 'version_1',
      projectId: projectId,
      title: '初始版本',
      version: 1.0,
      description: '项目的初始版本，包含基础功能',
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'user_123'
    },
    {
      id: 'version_2',
      projectId: projectId,
      title: '功能增强版',
      version: 1.1,
      description: '添加新功能和性能优化',
      createdAt: '2024-01-20T14:30:00Z',
      createdBy: 'user_123'
    }
  ];
  
  return {
    success: true,
    message: '获取成功',
    data: mockVersions
  };
  
  // 真实API请求（暂时注释）
  // return request.get(`/projects/${projectId}/versions`);
};

/**
 * 恢复到指定版本
 */
export const restoreProjectVersion = async (projectId: string, versionId: string): Promise<ApiResponse<Project>> => {
  // 模拟网络延迟
  await mockDelay(600);
  
  // 直接返回mock数据作为API响应
  return {
    success: true,
    message: '版本恢复成功',
    data: mockProjects[0]
  };
  
  // 真实API请求（暂时注释）
  // return request.post(`/projects/${projectId}/versions/${versionId}/restore`);
};