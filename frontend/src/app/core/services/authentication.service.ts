import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {
  IUser,
  IUserSignIn,
  IUserSignUp,
} from 'src/app/shared/interfaces/IUser';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  signUp(user: IUserSignUp): Observable<IUser> {
    return this.http.post<IUser>(`/users/signup`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  signIn(loginUser: IUserSignIn): Observable<IUser> {
    return this.http.post<IUser>(`/users/signin`, loginUser).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
