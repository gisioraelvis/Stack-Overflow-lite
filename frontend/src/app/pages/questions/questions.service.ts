import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpErrorPopupService } from 'src/app/components/http-error-popup/http-error-popup.service';
import { IPagination } from 'src/app/shared/interfaces/shared';
import {
  IAskQuestion,
  IQuestion,
  IQuestionSearch,
  IUpdateQuestion,
} from 'src/app/shared/interfaces/IQuestion';
import {
  IAddComment,
  IComment,
  IUpdateComment,
} from 'src/app/shared/interfaces/IComment';
import {
  IAddAnswer,
  IAnswer,
  IUpdateAnswer,
  IUpdateAnswerComment,
} from 'src/app/shared/interfaces/IAnswer';
import { IMessage } from 'src/app/shared/interfaces/IMessage';

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

  askQuestion(question: IAskQuestion): Observable<IQuestion> {
    console.log(question);
    return this.http.post<IQuestion>('/questions/ask', question).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        console.log(error);

        return throwError(() => new Error(error.message));
      })
    );
  }

  getQuestionById(questionId: number | string): Observable<IQuestion> {
    return this.http.get<IQuestion>(`/questions/${questionId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  updateQuestion(question: IUpdateQuestion): Observable<IQuestion> {
    return this.http.put<IQuestion>(`/questions/${question.id}`, question).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getQuestionComments(questionId: string | number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`/questions/${questionId}/comments`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getQuestionCommentById(
    questionId: string,
    commentId: string
  ): Observable<IQuestion> {
    return this.http
      .get<IQuestion>(`/questions/${questionId}/comments/${commentId}`)
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

  addCommentToQuestion(addCommentToAnswer: IAddComment): Observable<IComment> {
    return this.http
      .post<IComment>(`/questions/${addCommentToAnswer.questionId}/comments`, {
        body: addCommentToAnswer.body,
      })
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

  upvoteQuestion(questionId: string | number): Observable<IMessage> {
    return this.http
      .patch<IMessage>(`/questions/${questionId}/upvote`, {})
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

  downvoteQuestion(questionId: string | number): Observable<IMessage> {
    return this.http
      .patch<IMessage>(`/questions/${questionId}/downvote`, {})
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

  getQuestionAnswers(questionId: string | number): Observable<IAnswer[]> {
    return this.http.get<IAnswer[]>(`/questions/${questionId}/answers`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpErrorPopupService.showError(error.status, error.error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getQuestionAnswerById(
    questionId: string,
    answerId: string
  ): Observable<IQuestion> {
    return this.http
      .get<IQuestion>(`/questions/${questionId}/answers/${answerId}`)
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

  getQuestionAnswerComments(
    questionId: string | number,
    answerId: string | number
  ): Observable<IComment[]> {
    return this.http
      .get<IComment[]>(`/questions/${questionId}/answers/${answerId}/comments`)
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

  getQuestionAnswerCommentById(
    questionId: string,
    answerId: string,
    commentId: string
  ): Observable<IQuestion> {
    return this.http
      .get<IQuestion>(
        `/questions/${questionId}/answers/${answerId}/comments/${commentId}`
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

  addAnswerToQuestion(addAnswer: IAddAnswer): Observable<IAnswer> {
    return this.http
      .post<IAnswer>(`/questions/${addAnswer.questionId}/answers`, {
        body: addAnswer.body,
      })
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

  updateAnswer(updateAnswer: IUpdateAnswer): Observable<IQuestion> {
    return this.http
      .put<IQuestion>(
        `/questions/${updateAnswer.questionId}/answers/${updateAnswer.answerId}`,
        {
          body: updateAnswer.body,
        }
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

  addCommentToAnswer(addComment: IAddComment): Observable<IComment> {
    return this.http
      .post<IComment>(
        `/questions/${addComment.questionId}/answers/${addComment.answerId}/comments`,
        { body: addComment.body }
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

  updateAnswerComment(
    updateAnswerComment: IUpdateAnswerComment
  ): Observable<IQuestion> {
    return this.http
      .put<IQuestion>(
        `/questions/${updateAnswerComment.questionId}/answers/${updateAnswerComment.answerId}/comments/${updateAnswerComment.commentId}`,
        { body: updateAnswerComment.body }
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

  deleteAnswerComment(
    questionId: string,
    answerId: string,
    commentId: string
  ): Observable<IQuestion> {
    return this.http
      .delete<IQuestion>(
        `/questions/${questionId}/answers/${answerId}/comments/${commentId}`
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

  deleteQuestionAnswer(
    questionId: string,
    answerId: string
  ): Observable<IQuestion> {
    return this.http
      .delete<IQuestion>(`/questions/${questionId}/answers/${answerId}`)
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

  upvoteAnswer(
    questionId: string | number,
    answerId: string | number
  ): Observable<IMessage> {
    return this.http
      .patch<IMessage>(
        `/questions/${questionId}/answers/${answerId}/upvote`,
        {}
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

  downvoteAnswer(
    questionId: string | number,
    answerId: string | number
  ): Observable<IMessage> {
    return this.http
      .patch<IMessage>(
        `/questions/${questionId}/answers/${answerId}/downvote`,
        {}
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
