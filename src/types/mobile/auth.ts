// 认证相关类型定义

/**
 * 用户角色
 */
export type UserRole = 'anonymous' | 'participant' | 'judge' | 'admin';

/**
 * 登录请求
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * 注册请求
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  inviteCode?: string;
}

/**
 * 认证响应
 */
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

/**
 * 用户信息
 */
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  teamId?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 刷新令牌请求
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 刷新令牌响应
 */
export interface RefreshTokenResponse {
  token: string;
  expiresAt: string;
}

/**
 * 更新用户信息请求
 */
export interface UpdateProfileRequest {
  name?: string;
  avatar?: string;
}
