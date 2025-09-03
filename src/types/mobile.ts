// 移动端投票系统类型定义

export interface TeamInfo {
  id: string;
  name: string;
  logo: string;
  members: string[];
  description: string;
  projectTitle: string;
  projectDescription: string;
  demoVideo?: string;
  experienceLink?: string;
  documentation?: string;
  sourceCode?: string;
  techStack: string[];
  version: number;
  submittedAt: Date;
}

export interface PKMatch {
  id: string;
  round: number;
  teamA: TeamInfo;
  teamB: TeamInfo;
  status: 'pending' | 'voting' | 'completed';
  startTime: Date;
  endTime: Date;
  totalVotes: number;
  teamAVotes: number;
  teamBVotes: number;
}

export interface VoteRecord {
  id: string;
  pkId: string;
  voterId: string;
  selectedTeam: 'A' | 'B';
  votedAt: Date;
  ipAddress: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'participant' | 'judge' | 'admin' | 'guest';
  teamId?: string;
  totalVotes: number;
  pendingVotes: number;
}

export interface CompetitionStatus {
  currentRound: number;
  totalRounds: number;
  status: 'registration' | 'submission' | 'voting' | 'completed';
  startDate: Date;
  endDate: Date;
  onlineJudges: number;
  totalVotes: number;
  submissionDeadline: Date;
}

export interface LeaderboardEntry {
  rank: number;
  team: TeamInfo;
  totalVotes: number;
  winRate: number;
  roundsWon: number;
}

export interface FileUploadStatus {
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error' | 'paused';
  progress: number;
  error: string | null;
  url: string | null;
  version: number;
}

export interface LinkValidationStatus {
  url: string;
  status: 'idle' | 'validating' | 'valid' | 'invalid';
  previewData: any | null;
  error: string | null;
  lastChecked: Date | null;
}

export interface MobileVotingState {
  currentPK: PKMatch | null;
  selectedTeam: 'A' | 'B' | null;
  votingHistory: VoteRecord[];
  isLoading: boolean;
  isSubmitting: boolean;
  currentView: 'teamA' | 'teamB' | 'comparison';
  showConfirmDialog: boolean;
  swipeDirection: 'left' | 'right' | null;
  videoPlayingState: {
    teamA: boolean;
    teamB: boolean;
  };
  linkOpenState: {
    teamA: boolean;
    teamB: boolean;
  };
  error: string | null;
  networkStatus: 'online' | 'offline' | 'slow';
  retryCount: number;
}

export interface FileUploadState {
  files: {
    sourceCode: FileUploadStatus;
    demoVideo: FileUploadStatus;
    experienceLink: LinkValidationStatus;
    documentation: FileUploadStatus;
  };
  uploadProgress: {
    [key: string]: {
      progress: number;
      speed: number;
      timeRemaining: number;
    };
  };
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  activeUpload: string | null;
  dragOver: boolean;
  showPreview: boolean;
  networkStatus: 'stable' | 'unstable' | 'offline';
  retryQueue: any[];
}

export type VotingStateTransitions = {
  LOAD_PK: (state: MobileVotingState) => MobileVotingState;
  SELECT_TEAM: (state: MobileVotingState, team: 'A' | 'B') => MobileVotingState;
  SUBMIT_VOTE: (state: MobileVotingState) => MobileVotingState;
  HANDLE_ERROR: (state: MobileVotingState, error: string) => MobileVotingState;
  RESET_STATE: (state: MobileVotingState) => MobileVotingState;
};
