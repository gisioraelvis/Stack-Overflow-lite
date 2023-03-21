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

export interface IUserProfile {
  id: string | number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  isDeleted: boolean;
  isAdmin: boolean;
  updatedAt: Date | string;
  createdAt: Date | string;
}

export interface IUserProfileUpdate {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  bio: string;
  isDeleted: boolean;
  isAdmin: boolean;
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
}

export interface IUserState {
  user: IUser;
  error: string;
  signInError: string;
  signUpSuccess: string;
  signUpError: string;
  updateProfileSuccess: string;
  updateProfileError: string;
  userAnalytics: IUserAnalytics;
}

export interface IUserAnalytics {
  totalQuestions: number;
  totalAnswers: number;
  totalComments: number;
  totalTags: number;
  totalVotes: number;
  totalAcceptedAnswers: number;
}
