// 比赛相关类型定义

/**
 * 比赛阶段
 */
export type CompetitionStage = 'registration' | 'group_stage' | 'knockout' | 'semi_final' | 'final' | 'completed';

/**
 * 比赛信息
 */
export interface Competition {
  id: string;
  name: string;
  description?: string;
  currentStage: CompetitionStage;
  totalRounds: number;
  completedRounds: number;
  activeMatches: number;
  totalMatches: number;
  registeredTeams: number;
  maxTeams: number;
  startTime: string;
  endTime: string;
  estimatedEndTime?: string;
  registrationDeadline?: string;
  prizePool?: number;
  rules?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 比赛进度详情
 */
export interface CompetitionProgress {
  competition: Competition;
  votingStats: VotingStats;
}

// 导入依赖的类型
import { VotingStats } from './voting';
