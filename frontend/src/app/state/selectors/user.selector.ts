import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from 'src/app/shared/interfaces/IUser';

const selectUserState = createFeatureSelector<IUserState>('user');

export const currentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const signedInUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const signUpSuccess = createSelector(
  selectUserState,
  (state) => state.user
);

export const signUpError = createSelector(
  selectUserState,
  (state) => state.signUpError
);

export const SignInError = createSelector(
  selectUserState,
  (state) => state.signInError
);

export const updateProfileSuccess = createSelector(
  selectUserState,
  (state) => state.updateProfileSuccess
);

export const updateProfileError = createSelector(
  selectUserState,
  (state) => state.updateProfileError
);

export const userAnalytics = createSelector(
  selectUserState,
  (state) => state.userAnalytics
);
