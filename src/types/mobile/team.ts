// 团队相关类型定义

/**
 * 团队成员角色
 */
export type TeamMemberRole = 'leader' | 'member';

/**
 * 团队成员
 */
export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: TeamMemberRole;
  joinedAt: string;
  skills?: string[];
}

/**
 * 团队信息
 */
export interface Team {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  members: TeamMember[];
  isPublic: boolean;
  maxMembers: number;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 创建团队请求
 */
export interface CreateTeamRequest {
  name: string;
  description?: string;
  logo?: string;
  isPublic?: boolean;
}

/**
 * 更新团队请求
 */
export interface UpdateTeamRequest {
  name?: string;
  description?: string;
  logo?: string;
  isPublic?: boolean;
}

/**
 * 团队邀请请求
 */
export interface TeamInviteRequest {
  email: string;
  role?: TeamMemberRole;
  message?: string;
}

/**
 * 获取团队列表参数
 */
export interface GetTeamsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
}
