import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { IPagination, ISearch } from 'src/app/shared/interfaces/shared';
import { IDeleteSuccess } from 'src/app/shared/interfaces/ITag';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getUsers(pagination: IPagination): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(
        `/users?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`
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

  getUserById(userId: number | string): Observable<IUser> {
    return this.http.get<IUser>(`/users/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  searchUsers(usersSearch: ISearch): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(
        `/users/search?searchTerm=${usersSearch.searchTerm}&page=${usersSearch.pagination.page}&itemsPerPage=${usersSearch.pagination.itemsPerPage}`
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

  deleteUser(id: string | number): Observable<IDeleteSuccess> {
    return this.http.delete<IDeleteSuccess>(`/users/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
