import { createAction, props } from '@ngrx/store';
import { IPagination } from 'src/app/shared/interfaces/shared';
import { IDeleteSuccess } from 'src/app/shared/interfaces/ITag';
import {
  IPasswordReset,
  IUser,
  IUserAnalytics,
  IUserProfileUpdate,
  IUserSignIn,
  IUserSignUp,
} from 'src/app/shared/interfaces/IUser';

export const signIn = createAction('[User] Sign In', props<IUserSignIn>());

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<IUser>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: string }>()
);

export const signOut = createAction('[Auth] Sign Out');

export const signUp = createAction('[User] Sign Up', props<IUserSignUp>());

export const signUpSuccess = createAction(
  '[User] Sign Up Success',
  props<IUser>()
);

export const signUpFailure = createAction(
  '[User] Sign Up Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[User] Update Profile',
  props<IUserProfileUpdate>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<IUser>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);

export const getUserAnalytics = createAction(
  '[User] Get User Analytics',
  props<{ userId: number | string }>()
);

export const getUserAnalyticsSuccess = createAction(
  '[User] Get User Analytics Success',
  props<IUserAnalytics>()
);

export const getUserAnalyticsFailure = createAction(
  '[User] Get User Analytics Failure',
  props<{ error: string }>()
);

export const forgotPassword = createAction(
  '[User] Forgot Password',
  props<{ email: string }>()
);

export const forgotPasswordSuccess = createAction(
  '[User] Forgot Password Success',
  props<{ message: string }>()
);

export const forgotPasswordFailure = createAction(
  '[User] Forgot Password Failure',
  props<{ error: string }>()
);

export const resetPassword = createAction(
  '[User] Reset Password',
  props<IPasswordReset>()
);

export const resetPasswordSuccess = createAction(
  '[User] Reset Password Success',
  props<IUser>()
);

export const resetPasswordFailure = createAction(
  '[User] Reset Password Failure',
  props<{ error: string }>()
);

export const getUsers = createAction(
  '[Users] Get Users',
  props<IPagination>()
);

export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: IUser[] }>()
);

export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: string }>()
);

export const getUserById = createAction(
  '[Users] Get User',
  props<{ id: number | string }>()
);

export const getUserByIdSuccess = createAction(
  '[Users] Get User Success',
  props<{ user: IUser }>()
);

export const getUserByIdFailure = createAction(
  '[Users] Get User Failure',
  props<{ error: string }>()
);

export const searchUsers = createAction(
  '[Users] Search Users',
  props<{
    searchTerm: string | undefined | null;
    page: number;
    itemsPerPage: number;
  }>()
);

export const searchUsersSuccess = createAction(
  '[Users] Search Users Success',
  props<{ users: IUser[] }>()
);

export const searchUsersFailure = createAction(
  '[Users] Search Users Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ id: string | number }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<IDeleteSuccess>()
);

export const deleteUserFailure = createAction(
  '[Users] Delete User Failure',
  props<{ error: string }>()
);

export const clearUsers = createAction('[Users] Clear Users');
export const clearUser = createAction('[Users] Clear User');
export const clearError = createAction('[Users] Clear Error');
