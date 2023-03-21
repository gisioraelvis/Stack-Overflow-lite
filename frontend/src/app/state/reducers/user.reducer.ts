import { createReducer, createSelector, on } from '@ngrx/store';
import { IUserState } from 'src/app/shared/interfaces/IUser';
import * as UserActions from '../actions/user.actions';

const initialState: IUserState = {
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
  signInSuccess: {
    id: '',
    name: '',
    email: '',
    password: '',
    isAdmin: false,
    createdAt: '',
    updatedAt: '',
  },
  signInError: '',
  signUpSuccess: '',
  signUpError: '',
  updateProfileSuccess: '',
  updateProfileError: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.signInSuccess, (state, user) => ({
    ...state,
    signedInUser: user,
  })),
  on(UserActions.signInFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.signUpSuccess, (state, user) => ({
    ...state,
    signedInUser: user,
  })),
  on(UserActions.signUpFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.loadProfile, (state) => ({
    ...state,
    signedInUser: state.user,
  })),
  on(UserActions.loadProfileSuccess, (state, user) => ({
    ...state,
    signedInUser: user,
  })),
  on(UserActions.updateProfileSuccess, (state, user) => ({
    ...state,
    signedInUser: user,
  })),
  on(UserActions.signOut, (state) => ({ ...state, initialState }))
);
