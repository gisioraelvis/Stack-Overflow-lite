export interface IUserSignIn {
  email: string;
  password: string;
}

export interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserProfileUpdate {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
  bio?: string;
  isDeleted?: boolean;
  isAdmin?: boolean;
}

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  isDeleted: boolean;
  isAdmin: boolean;
  updatedAt: Date | string;
  createdAt: Date | string;
  JWT: string;
  userAnalytics: IUserAnalytics;
}

export interface IUserState {
  loading: boolean;
  loaded: boolean;
  users: IUser[];
  user: IUser;
  userAnalytics: IUserAnalytics;
  message: string;
  error: string;
}

export interface IUserAnalytics {
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  totalTags: number;
  totalVotes: number;
  totalAcceptedAnswers: number;
}

export interface IPasswordReset {
  resetToken: string;
  password: string;
  confirmPassword: string;
}
