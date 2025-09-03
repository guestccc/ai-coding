// 移动端 API Mock 数据
import { User } from '../../types/mobile/auth';
import { Team } from '../../types/mobile/team';
import { Project } from '../../types/mobile/project';
import { 
  PKMatch, 
  VoteRecord, 
  VotingStats, 
  UserVotingStats, 
  LeaderboardItem 
} from '../../types/mobile/voting';
import { Competition } from '../../types/mobile/competition';
import { FileInfo } from '../../types/mobile/common';

// Mock 用户数据
export const mockUser: User = {
  id: 'user_001',
  email: 'judge@aihackathon.com',
  name: '张评委',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'judge',
  teamId: undefined,
  isActive: true,
  lastLoginAt: '2024-01-01T10:00:00Z',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z'
};

// Mock 团队数据
export const mockTeams: Team[] = [
  {
    id: 'team_001',
    name: 'AI创新先锋',
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=100&h=100&fit=crop',
    description: '专注于AI技术创新的精英团队',
    members: [
      {
        id: 'member_001',
        userId: 'user_002',
        name: '李明',
        email: 'li.ming@example.com',
        role: 'leader',
        joinedAt: '2024-01-01T00:00:00Z',
        skills: ['React', 'Node.js', 'AI']
      }
    ],
    isPublic: true,
    maxMembers: 5,
    inviteCode: 'TEAM001',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'team_002',
    name: '数据耕队队',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
    description: '数据驱动的智能解决方案团队',
    members: [
      {
        id: 'member_003',
        userId: 'user_004',
        name: '张三',
        email: 'zhang.san@example.com',
        role: 'leader',
        joinedAt: '2024-01-01T00:00:00Z',
        skills: ['Vue', 'Java', '大数据']
      }
    ],
    isPublic: true,
    maxMembers: 5,
    inviteCode: 'TEAM002',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock 项目数据
export const mockProjects: Project[] = [
  {
    id: 'project_001',
    teamId: 'team_001',
    title: '智能客服助手',
    description: '基于大语言模型的智能客服系统，能够理解用户意图并提供准确的回答。',
    demoVideoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    experienceUrl: 'https://demo.aihackathon.com/project001',
    githubUrl: 'https://github.com/aihackathon/project001',
    techStack: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    category: 'AI应用',
    status: 'published',
    isPublished: true,
    version: 1,
    submittedAt: '2024-01-01T08:00:00Z',
    publishedAt: '2024-01-01T08:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z'
  },
  {
    id: 'project_002',
    teamId: 'team_002',
    title: '数据可视化平台',
    description: '企业级数据可视化平台，支持多种数据源接入，提供丰富的图表类型。',
    demoVideoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    experienceUrl: 'https://demo.aihackathon.com/project002',
    githubUrl: 'https://github.com/aihackathon/project002',
    techStack: ['Vue', 'Java', 'ECharts', 'MySQL'],
    category: '数据应用',
    status: 'published',
    isPublished: true,
    version: 1,
    submittedAt: '2024-01-01T08:00:00Z',
    publishedAt: '2024-01-01T08:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z'
  }
];

// Mock PK对战数据
export const mockPKMatch: PKMatch = {
  id: 'pk_12345',
  roundId: 'round_3',
  teamA: mockTeams[0],
  teamB: mockTeams[1],
  projectA: mockProjects[0],
  projectB: mockProjects[1],
  status: 'active',
  startTime: '2024-01-01T10:00:00Z',
  endTime: '2024-01-01T12:00:00Z',
  totalVotes: 156,
  teamAVotes: 89,
  teamBVotes: 67,
  judgeLimit: 100,
  createdAt: '2024-01-01T09:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z'
};

// Mock 投票统计数据
export const mockVotingStats: VotingStats = {
  totalJudges: 500,
  activeJudges: 342,
  totalVotes: 2847,
  averageVoteTime: 42.5,
  completionRate: 85.6
};

// Mock 用户投票统计
export const mockUserVotingStats: UserVotingStats = {
  totalVotes: 45,
  correctPredictions: 38,
  averageVoteTime: 42.5,
  longestStreak: 12,
  currentStreak: 5,
  favoriteCategory: 'AI应用',
  completedMatches: 45,
  pendingMatches: 3
};

// Mock 排行榜数据
export const mockLeaderboard: LeaderboardItem[] = [
  {
    rank: 1,
    team: mockTeams[0],
    project: mockProjects[0],
    totalVotes: 156,
    winRate: 0.92,
    matchesPlayed: 12,
    matchesWon: 11,
    score: 125.6
  },
  {
    rank: 2,
    team: mockTeams[1],
    project: mockProjects[1],
    totalVotes: 134,
    winRate: 0.85,
    matchesPlayed: 12,
    matchesWon: 10,
    score: 118.4
  }
];

// Mock 投票记录数据
export const mockVoteRecords: VoteRecord[] = [
  {
    id: 'vote_001',
    pkId: 'match_001',
    judgeId: 'user_001',
    winnerTeamId: 'team_001',
    loserTeamId: 'team_002',
    winnerTeamName: 'AI创新先锋',
    loserTeamName: 'AI探索者',
    reason: '技术实现更加完善，用户体验优秀',
    confidence: 'high',
    matchDuration: 180,
    votedAt: '2024-01-15T10:30:00Z',
    lockExpiresAt: '2024-01-15T10:40:00Z'
  },
  {
    id: 'vote_002',
    pkId: 'match_002',
    judgeId: 'user_001',
    winnerTeamId: 'team_002',
    loserTeamId: 'team_003',
    winnerTeamName: 'AI探索者',
    loserTeamName: '智能先锋队',
    reason: '创新性更强，解决方案更具实用性',
    confidence: 'medium',
    matchDuration: 220,
    votedAt: '2024-01-15T11:15:00Z',
    lockExpiresAt: '2024-01-15T11:25:00Z'
  },
  {
    id: 'vote_003',
    pkId: 'match_003',
    judgeId: 'user_001',
    winnerTeamId: 'team_004',
    loserTeamId: 'team_001',
    winnerTeamName: '未来科技团',
    loserTeamName: 'AI创新先锋',
    reason: '算法优化出色，性能表现突出',
    confidence: 'high',
    matchDuration: 165,
    votedAt: '2024-01-15T14:20:00Z',
    lockExpiresAt: '2024-01-15T14:30:00Z'
  }
];

// Mock 比赛数据
export const mockCompetition: Competition = {
  id: 'comp_001',
  name: '2024年AI黑客松竞赛',
  description: '年度AI技术创新竞赛，汇聚行业精英，展示最新AI应用成果',
  currentStage: 'knockout',
  totalRounds: 5,
  completedRounds: 3,
  activeMatches: 8,
  totalMatches: 32,
  registeredTeams: 64,
  maxTeams: 64,
  startTime: '2024-01-01T08:00:00Z',
  endTime: '2024-01-03T18:00:00Z',
  estimatedEndTime: '2024-01-03T16:00:00Z',
  registrationDeadline: '2023-12-31T23:59:59Z',
  prizePool: 100000,
  rules: '详细比赛规则请查看官方文档',
  createdAt: '2023-12-01T00:00:00Z',
  updatedAt: '2024-01-01T10:00:00Z'
};

// 模拟延迟函数
export const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟随机成功/失败
export const mockRandomSuccess = (successRate: number = 0.9) => Math.random() < successRate;
