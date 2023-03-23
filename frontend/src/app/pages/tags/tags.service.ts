import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';
import { IPagination, ISearch } from 'src/app/shared/interfaces/shared';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import {
  IDeleteSuccess,
  ITag,
  ITagUpdate,
} from 'src/app/shared/interfaces/ITag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(
    private http: HttpClient,
    private httpErrorPopupService: HttpErrorPopupService
  ) {}

  getTags(pagination: IPagination): Observable<ITag[]> {
    return this.http
      .get<ITag[]>(
        `/tags?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`
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

  getTagById(tagId: number | string): Observable<ITag> {
    return this.http.get<ITag>(`/tags/${tagId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getQuestionsByTag(
    tagId: string,
    pagination: IPagination
  ): Observable<IQuestion[]> {
    return this.http
      .get<IQuestion[]>(
        `/tags/${tagId}/questions?page=${pagination.page}&itemsPerPage=${pagination.itemsPerPage}`
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

  createTag(tag: ITag): Observable<ITag> {
    return this.http.post<ITag>('/tags', tag).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  searchTags(tagsSearch: ISearch): Observable<ITag[]> {
    return this.http
      .get<ITag[]>(
        `/tags/search?searchTerm=${tagsSearch.searchTerm}&page=${tagsSearch.pagination.page}&itemsPerPage=${tagsSearch.pagination.itemsPerPage}`
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

  updateTag(updateTag: ITagUpdate): Observable<ITag> {
    const { id, ...tag } = updateTag;
    return this.http.put<ITag>(`/tags/${id}`, tag).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  deleteTag(id: string | number): Observable<IDeleteSuccess> {
    return this.http.delete<IDeleteSuccess>(`/tags/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  addQuestionToTag(tagId: string, questionId: string): Observable<ITag> {
    return this.http
      .post<ITag>(`/tags/${tagId}/questions/${questionId}`, {})
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

  removeQuestionFromTag(tagId: string, questionId: string): Observable<ITag> {
    return this.http
      .delete<ITag>(`/tags/${tagId}/questions/${questionId}`)
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
