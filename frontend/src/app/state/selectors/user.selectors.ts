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

export const getUserProfileLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const getUserProfileError = createSelector(
  selectUserState,
  (state) => state.error
);

export const userAnalytics = createSelector(
  selectUserState,
  (state) => state.userAnalytics
);

export const getUserAnalyticsLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const getUserAnalyticsError = createSelector(
  selectUserState,
  (state) => state.error
);

export const users = createSelector(selectUserState, (state) => state.users);

export const getUsersLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const getUsersError = createSelector(
  selectUserState,
  (state) => state.error
);

export const user = createSelector(selectUserState, (state) => state.user);

export const getUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const getUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const responseMessage = createSelector(
  selectUserState,
  (state) => state.message
)
