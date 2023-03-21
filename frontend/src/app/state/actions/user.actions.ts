import { createAction, props } from '@ngrx/store';
import { IMessage } from 'src/app/shared/interfaces/IMessage';
import {
  IUser,
  IUserProfile,
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

export const loadProfile = createAction('[User] Load User Profile');

export const loadProfileSuccess = createAction(
  '[User] Load User Profile Success',
  props<IUserProfile>()
);

export const loadProfileFailure = createAction(
  '[User] Load User Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[User] Update Profile',
  props<IUserProfileUpdate>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<IUserProfile>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: string }>()
);
