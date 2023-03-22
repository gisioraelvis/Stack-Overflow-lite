import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from 'src/app/shared/interfaces/IUser';

const selectUserState = createFeatureSelector<IUserState>('user');

export const currentUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const userProfile = createSelector(
  selectUserState,
  (state) => state.user
);

export const userAnalytics = createSelector(
  selectUserState,
  (state) => state.userAnalytics
);

export const responseMessage = createSelector(
  selectUserState,
  (state) => state.message
)
