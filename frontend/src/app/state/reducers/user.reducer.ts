import { createReducer, createSelector, on } from '@ngrx/store';
import { IUserState } from 'src/app/shared/interfaces/IUser';
import * as UserActions from '../actions/user.actions';

const initialState: IUserState = {
  loading: false,
  loaded: false,
  users: [],
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
  },
  message: '',
  error: '',
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
  on(UserActions.signOut, (state) => ({ ...state, user: initialState.user })),
  on(UserActions.getUserAnalyticsSuccess, (state, userAnalytics) => ({
    ...state,
    userAnalytics,
  })),
  on(UserActions.forgotPasswordSuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(UserActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.resetPasswordSuccess, (state, user) => ({
    ...state,
    user,
  })),
  on(UserActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.getUsers, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(UserActions.getUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users,
  })),
  on(UserActions.getUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(UserActions.getUserById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    user: initialState.user,
  })),
  on(UserActions.getUserByIdSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    users: [...state.users, user],
  })),
  on(UserActions.getUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(UserActions.searchUsers, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(UserActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    loaded: true,
    users,
  })),
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: false,
    error,
  })),
  on(UserActions.deleteUserSuccess, (state, { message }) => ({
    ...state,
    message,
    users: state.users.filter((user) => user.id !== state.user.id),
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.clearUsers, (state) => ({
    ...state,
    users: [],
  })),
  on(UserActions.clearUser, (state) => ({
    ...state,
    user: initialState.user,
  })),
  on(UserActions.clearError, (state) => ({
    ...state,
    error: '',
  }))
);
