import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';
import { ISiteAnalytics } from 'src/app/shared/interfaces/IAnalytics';

@Injectable({
  providedIn: 'root',
})
export class AdminDashBoardService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getSiteAnalytics(): Observable<ISiteAnalytics> {    
    return this.http
      .get<ISiteAnalytics>(`/admin/analytics`)
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
