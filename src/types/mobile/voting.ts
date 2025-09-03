// 投票相关类型定义

/**
 * PK对战状态
 */
export type PKMatchStatus = 'pending' | 'active' | 'completed' | 'cancelled';

/**
 * PK对战信息
 */
export interface PKMatch {
  id: string;
  roundId: string;
  teamA: Team;
  teamB: Team;
  projectA: Project;
  projectB: Project;
  status: PKMatchStatus;
  startTime: string;
  endTime: string;
  totalVotes: number;
  teamAVotes: number;
  teamBVotes: number;
  judgeLimit: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * PK任务响应
 */
export interface PKTaskResponse {
  success: boolean;
  pk?: PKMatch;
  lockId?: string;
  expiresAt?: string;
  remainingTime?: number;
  error?: string;
}

/**
 * 投票信心度
 */
export type VoteConfidence = 'high' | 'medium' | 'low';

/**
 * 投票提交请求
 */
export interface VoteSubmissionRequest {
  pkId: string;
  winnerTeamId: string;
  lockId: string;
  confidence?: VoteConfidence;
  reason?: string;
}

/**
 * 投票记录
 */
export interface VoteRecord {
  id: string;
  pkId: string;
  judgeId: string;
  winnerTeamId: string;
  loserTeamId: string;
  winnerTeamName: string;
  loserTeamName: string;
  confidence?: VoteConfidence;
  reason?: string;
  matchDuration: number;
  isCorrectPrediction?: boolean;
  votedAt: string;
  lockExpiresAt: string;
}

/**
 * 投票提交响应
 */
export interface VoteSubmissionResponse {
  success: boolean;
  voteRecord?: VoteRecord;
  nextPK?: PKMatch;
  error?: string;
  conflictReason?: 'expired' | 'duplicate' | 'invalid_lock' | 'round_ended';
}

/**
 * 投票统计
 */
export interface VotingStats {
  totalJudges: number;
  activeJudges: number;
  totalVotes: number;
  averageVoteTime: number;
  completionRate: number;
}

/**
 * 用户投票统计
 */
export interface UserVotingStats {
  totalVotes: number;
  correctPredictions: number;
  averageVoteTime: number;
  longestStreak: number;
  currentStreak: number;
  favoriteCategory?: string;
  completedMatches: number;
  pendingMatches: number;
}

/**
 * 排行榜项目
 */
export interface LeaderboardItem {
  rank: number;
  team: Team;
  project: Project;
  totalVotes: number;
  winRate: number;
  matchesPlayed: number;
  matchesWon: number;
  score: number;
}

/**
 * 获取投票记录参数
 */
export interface GetVotingRecordsParams {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  confidence?: VoteConfidence;
}

/**
 * 获取排行榜参数
 */
export interface GetLeaderboardParams {
  limit?: number;
  category?: string;
}

// 导入依赖的类型
import { Team } from './team';
import { Project } from './project';
