import { createReducer, createSelector, on } from '@ngrx/store';
import { IUserState } from 'src/app/shared/interfaces/IUser';
import * as UserActions from '../actions/user.actions';

const initialState: IUserState = {
  error: '',
  user: {
    id: '',
    name: '',
    email: '',
    avatar: '',
    bio: '',
    isAdmin: false,
    isDeleted: false,
    createdAt: '',
    updatedAt: '',
    JWT: '',
  },
  userAnalytics: {
    totalQuestions: 0,
    totalAnswers: 0,
    totalComments: 0,
    totalTags: 0,
    totalVotes: 0,
    totalAcceptedAnswers: 0,
  }
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.signInSuccess, (state, user) => ({
    ...state,
    user,
  })),
  on(UserActions.signInFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.signUpSuccess, (state, user) => ({
    ...state,
    user,
  })),
  on(UserActions.signUpFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.updateProfileSuccess, (state, user) => ({
    ...state,
    user,
  })),
  on(UserActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.signOut, (state) => ({ ...state, initialState })),
  on(UserActions.getUserAnalyticsSuccess, (state, userAnalytics) => ({
    ...state,
    userAnalytics,
  }))
);
