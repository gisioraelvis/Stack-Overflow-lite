import { createAction, props } from '@ngrx/store';
import {
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
