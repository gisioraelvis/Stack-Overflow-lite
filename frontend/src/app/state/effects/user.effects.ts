import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import {
  IUser,
  IUserProfile,
  IUserProfileUpdate,
  IUserSignIn,
  IUserSignUp,
} from 'src/app/shared/interfaces/IUser';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UpdateProfileService } from 'src/app/pages/update-profile/update-profile.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private updateProfileService: UpdateProfileService,
    private localStorageService: LocalStorageService,
  ) {}

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signUp),
      concatMap((action: IUserSignUp) => {
        const { name, email, password, confirmPassword } = action;
        return this.authenticationService
          .signUp({
            name,
            email,
            password,
            confirmPassword,
          })
          .pipe(
            map((successResponse: IUser) => {
              this.localStorageService.setJWT(successResponse.JWT!);
              this.authorizationService.isSignedIn = true;
              return UserActions.signInSuccess({
                id: successResponse.id,
                name: successResponse.name,
                email: successResponse.email,
                avatar: successResponse.avatar,
                bio: successResponse.bio,
                isAdmin: successResponse.isAdmin,
                isDeleted: successResponse.isDeleted,
                createdAt: successResponse.createdAt,
                updatedAt: successResponse.updatedAt,
                JWT: successResponse.JWT,
              });
            }),
            catchError((error) => of(UserActions.signUpFailure({ error })))
          );
      })
    );
  });

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.signIn),
      mergeMap((action: IUserSignIn) => {
        const { email, password } = action;
        return this.authenticationService.signIn({ email, password }).pipe(
          map((successResponse: IUser) => {
            this.localStorageService.setJWT(successResponse.JWT!);
            this.authorizationService.isSignedIn = true;
            return UserActions.signInSuccess({
              id: successResponse.id,
              name: successResponse.name,
              email: successResponse.email,
              avatar: successResponse.avatar,
              bio: successResponse.bio,
              isAdmin: successResponse.isAdmin,
              isDeleted: successResponse.isDeleted,
              createdAt: successResponse.createdAt,
              updatedAt: successResponse.updatedAt,
              JWT: successResponse.JWT,
            });
          }),
          catchError((error) => of(UserActions.signInFailure({ error })))
        );
      })
    );
  });

  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateProfile),
      concatMap((action: IUserProfileUpdate) => {
        const {
          name,
          email,
          password,
          confirmPassword,
          avatar,
          bio,
          isDeleted,
          isAdmin,
        } = action;
        return this.updateProfileService
          .updateProfile({
            name,
            email,
            password,
            confirmPassword,
            avatar,
            bio,
            isDeleted,
            isAdmin,
          })
          .pipe(
            map((successResponse: IUserProfile) => {
              return UserActions.updateProfileSuccess({
                id: successResponse.id,
                name: successResponse.name,
                email: successResponse.email,
                avatar: successResponse.avatar,
                bio: successResponse.bio,
                isDeleted: successResponse.isDeleted,
                isAdmin: successResponse.isAdmin,
                updatedAt: successResponse.updatedAt,
                createdAt: successResponse.createdAt,
              });
            }),
            catchError((error) =>
              of(UserActions.updateProfileFailure({ error }))
            )
          );
      })
    );
  });
}
