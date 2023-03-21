import { createAction, props } from '@ngrx/store';
import { LoginUser, LoginSuccess, User } from 'src/app/core/interfaces';
import { IUser } from 'src/app/shared/interfaces/IUser';

export const login = createAction('[User] Login', props<LoginUser>());

export const loginSuccess = createAction(
  '[User] Login Success',
  props<LoginSuccess>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const register = createAction('[User] Register', props<any>());

export const registerSuccess = createAction(
  '[User] Register Success',
  props<{ message: string }>()
);

export const registerFailure = createAction(
  '[User] Register Failure',
  props<{ error: string }>()
);

export const loadProfile = createAction('[User] Load User Profile');

export const loadProfileSuccess = createAction(
  '[User] Load User Profile Success',
  props<User>()
);

export const loadProfileFailure = createAction(
  '[User] Load User Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[User] Update Profile',
  props<any>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ message: string }>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);
