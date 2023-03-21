import { createReducer, createSelector, on } from '@ngrx/store';
import { LoginSuccess } from 'src/app/core/interfaces';
import { IUser } from 'src/app/shared/interfaces/IUser';
import * as UserActions from '../Actions/user.actions';

export interface UserState {
  user: IUser;
  error: string;
  loginSuccess: LoginSuccess;
  loginError: string;
  registerSuccess: string;
  registerError: string;
  updateSuccess: string;
  updateError: string;
}

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    createdAt: '',
    updatedAt: '',
  },
  error: '',
  loginSuccess: {
    message: '',
    token: '',
    role: '',
    name: '',
  },
  loginError: '',
  registerSuccess: '',
  registerError: '',
  updateSuccess: '',
  updateError: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),
  on(UserActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.registerSuccess, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),
  on(UserActions.registerFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.loadProfile, (state) => ({
    ...state,
    loggedInUser: state.user,
  })),
  on(UserActions.loadProfileSuccess, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),
  on(UserActions.updateProfileSuccess, (state, user) => ({
    ...state,
    loggedInUser: user,
  })),
  on(UserActions.logout, (state) => ({ ...state, initialState }))
);
