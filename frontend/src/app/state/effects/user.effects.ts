import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import {
  IUser,
  IUserAnalytics,
  IUserProfileUpdate,
  IUserSignIn,
  IUserSignUp,
} from 'src/app/shared/interfaces/IUser';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UpdateProfileService } from 'src/app/pages/update-profile/update-profile.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { UserDashBoardService } from 'src/app/pages/user-dashboard/user-analytics.service';
import { IMessage } from 'src/app/shared/interfaces/IMessage';
import { UsersService } from 'src/app/pages/users/users.service';
import { IDeleteSuccess } from 'src/app/shared/interfaces/ITag';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService,
    private updateProfileService: UpdateProfileService,
    private localStorageService: LocalStorageService,
    private userDashBoardService: UserDashBoardService,
    private usersService: UsersService
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
                user: successResponse,
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
              user: successResponse,
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
            map((successResponse: IUser) => {
              return UserActions.updateProfileSuccess({
                user: successResponse,
              });
            }),
            catchError((error) =>
              of(UserActions.updateProfileFailure({ error }))
            )
          );
      })
    );
  });

  getUserAnalytics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserAnalytics),
      mergeMap((action) => {
        const { userId } = action;
        return this.userDashBoardService.getUserAnalytics(userId).pipe(
          map((successResponse: IUserAnalytics) => {
            return UserActions.getUserAnalyticsSuccess({
              totalQuestions: successResponse.totalQuestions,
              totalAnswers: successResponse.totalAnswers,
              totalComments: successResponse.totalComments,
              totalTags: successResponse.totalTags,
              totalVotes: successResponse.totalVotes,
              totalAcceptedAnswers: successResponse.totalAcceptedAnswers,
            });
          }),
          catchError((error) =>
            of(UserActions.getUserAnalyticsFailure({ error }))
          )
        );
      })
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.forgotPassword),
      mergeMap((action) => {
        const { email } = action;
        return this.authenticationService.forgotPassword(email).pipe(
          map((successResponse: IMessage) => {
            return UserActions.forgotPasswordSuccess({
              message: successResponse.message,
            });
          }),
          catchError((error) =>
            of(UserActions.forgotPasswordFailure({ error }))
          )
        );
      })
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.resetPassword),
      mergeMap((action) => {
        const { password, confirmPassword, resetToken } = action;
        return this.authenticationService
          .resetPassword({ password, confirmPassword, resetToken })
          .pipe(
            map((successResponse: IUser) => {
              this.localStorageService.setJWT(successResponse.JWT!);
              this.authorizationService.isSignedIn = true;
              return UserActions.signInSuccess({
                user: successResponse,
              });
            }),
            catchError((error) =>
              of(UserActions.resetPasswordFailure({ error }))
            )
          );
      })
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap((action) => {
        const { page, itemsPerPage } = action;
        return this.usersService.getUsers({ page, itemsPerPage }).pipe(
          map((successResponse: IUser[]) => {
            return UserActions.getUsersSuccess({ users: successResponse });
          }),
          catchError((error) => of(UserActions.getUsersFailure({ error })))
        );
      })
    );
  });

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getUserById),
      mergeMap((action) => {
        const { id } = action;
        return this.usersService.getUserById(id).pipe(
          map((successResponse: IUser) => {
            return UserActions.getUserByIdSuccess({ user: successResponse });
          }),
          catchError((error) => of(UserActions.getUserByIdFailure({ error })))
        );
      })
    );
  });

  searchUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.searchUsers),
      mergeMap((action) => {
        const { searchTerm, page, itemsPerPage } = action;
        return this.usersService
          .searchUsers({ searchTerm, pagination: { page, itemsPerPage } })
          .pipe(
            map((successResponse: IUser[]) => {
              return UserActions.searchUsersSuccess({ users: successResponse });
            }),
            catchError((error) => of(UserActions.searchUsersFailure({ error })))
          );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) => {
        const { id } = action;
        return this.usersService.deleteUser(id).pipe(
          map((successResponse: IDeleteSuccess) => {
            const { id, message } = successResponse;
            return UserActions.deleteUserSuccess({
              id,
              message,
            });
          }),
          catchError((error) => of(UserActions.deleteUserFailure({ error })))
        );
      })
    );
  });
}
