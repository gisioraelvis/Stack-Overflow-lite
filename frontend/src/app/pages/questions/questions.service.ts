import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';
import { IPagination } from 'src/app/shared/interfaces/shared';
import {
  IQuestion,
  IQuestionSearch,
} from 'src/app/shared/interfaces/IQuestion';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getQuestions(pagination: IPagination): Observable<IQuestion[]> {
    return this.http
      .get<IQuestion[]>(
        `/questions?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`
      )
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

  searchQuestions(questionSearch: IQuestionSearch): Observable<IQuestion[]> {
    return this.http
      .get<IQuestion[]>(
        `/questions/search?searchTerm=${questionSearch.searchTerm}&page=${questionSearch.pagination.page}&itemsPerPage=${questionSearch.pagination.itemsPerPage}`
      )
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

  getQuestionsByUser(
    userId: string,
    pagination: IPagination
  ): Observable<IQuestion[]> {
    return this.http
      .get<IQuestion[]>(
        `/questions/user/${userId}?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`
      )
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
