import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL } from 'src/app/constants';
import {
  IUser,
  IUserProfileUpdate,
} from 'src/app/shared/interfaces/IUser';
import { IMessage } from 'src/app/shared/interfaces/IMessage';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  updateProfile(user: IUserProfileUpdate): Observable<IUser> {
    return this.http
      .put<IUser>(`/users/profile`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.httpErrorPopupService.showError(
            error.status,
            error.error.message
          );
          return throwError(() => new Error(error.message));
        })
      );
  }
}
