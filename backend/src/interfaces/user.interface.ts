export interface IUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  password?: string;
  isDeleted?: boolean;
  isAdmin: boolean;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}

export interface IUserAnalytics {
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  totalTags: number;
  totalVotes: number;
  totalAcceptedAnswers: number;
}
