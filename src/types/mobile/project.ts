// 项目相关类型定义

/**
 * 项目状态
 */
export type ProjectStatus = 'draft' | 'submitted' | 'published' | 'archived';

/**
 * 项目信息
 */
export interface Project {
  id: string;
  teamId: string;
  title: string;
  description: string;
  demoVideoUrl?: string;
  experienceUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  category?: string;
  status: ProjectStatus;
  isPublished: boolean;
  version: number;
  submittedAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 创建项目请求
 */
export interface CreateProjectRequest {
  title: string;
  description: string;
  demoVideoUrl?: string;
  experienceUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  category?: string;
}

/**
 * 更新项目请求
 */
export interface UpdateProjectRequest extends CreateProjectRequest {
  status?: ProjectStatus;
  isPublished?: boolean;
}

/**
 * 项目版本
 */
export interface ProjectVersion {
  id: string;
  projectId: string;
  version: number;
  title: string;
  description: string;
  changes?: string;
  createdBy: string;
  createdAt: string;
}

/**
 * 获取项目列表参数
 */
export interface GetProjectsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  teamId?: string;
  status?: ProjectStatus;
}
