import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IUserAnalytics } from 'src/app/shared/interfaces/IUser';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';

@Injectable({
  providedIn: 'root',
})
export class UserDashBoardService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getUserAnalytics(userId: number | string): Observable<IUserAnalytics> {    
    return this.http
      .get<IUserAnalytics>(`/users/${userId}/analytics`)
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
