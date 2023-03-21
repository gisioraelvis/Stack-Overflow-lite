import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../Reducers/user.reducer';

const selectUserState = createFeatureSelector<UserState>('user');

export const currentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const loggedInUser = createSelector(
  selectUserState,
  (state) => state.loginSuccess
);

export const registerSuccess = createSelector(
  selectUserState,
  (state) => state.registerSuccess
);

export const registerError = createSelector(
  selectUserState,
  (state) => state.registerError
);

export const loginError = createSelector(
  selectUserState,
  (state) => state.loginError
);

export const updateSuccess = createSelector(
  selectUserState,
  (state) => state.updateSuccess
);

export const updateError = createSelector(
  selectUserState,
  (state) => state.updateError
);
