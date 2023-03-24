import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as QuestionsActions from '../actions/questions.actions';
import { of } from 'rxjs';
import { QuestionsService } from 'src/app/pages/questions/questions.service';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';
import { IComment } from 'src/app/shared/interfaces/IComment';
import { IMessage } from 'src/app/shared/interfaces/IMessage';
import { IAnswer } from 'src/app/shared/interfaces/IAnswer';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) {}

  getQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestions),
      mergeMap((action) => {
        const { page, itemsPerPage } = action;
        return this.questionsService.getQuestions({ page, itemsPerPage }).pipe(
          map((successResponse: IQuestion[]) => {
            return QuestionsActions.getQuestionsSuccess({
              questions: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.getQuestionsFailure({ error }))
          )
        );
      })
    );
  });

  searchQuestions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.searchQuestions),
      mergeMap((action) => {
        const { searchTerm, page, itemsPerPage } = action;
        return this.questionsService
          .searchQuestions({ searchTerm, pagination: { page, itemsPerPage } })
          .pipe(
            map((successResponse: IQuestion[]) => {
              return QuestionsActions.searchQuestionsSuccess({
                questions: successResponse,
              });
            }),
            catchError((error) =>
              of(QuestionsActions.searchQuestionsFailure({ error }))
            )
          );
      })
    );
  });

  getQuestionsByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestionsByUser),
      mergeMap((action) => {
        const { userId, pagination } = action;
        return this.questionsService
          .getQuestionsByUser(userId, pagination)
          .pipe(
            map((successResponse: IQuestion[]) => {
              return QuestionsActions.getQuestionsByUserSuccess({
                questions: successResponse,
              });
            }),
            catchError((error) =>
              of(QuestionsActions.getQuestionsByUserFailure({ error }))
            )
          );
      })
    );
  });

  getQuestionById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestionById),
      mergeMap((action) => {
        const { id } = action;
        return this.questionsService.getQuestionById(id).pipe(
          map((successResponse: IQuestion) => {
            return QuestionsActions.getQuestionByIdSuccess({
              question: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.getQuestionByIdFailure({ error }))
          )
        );
      })
    );
  });

  askQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.askQuestion),
      mergeMap((action) => {
        const { question } = action;
        return this.questionsService.askQuestion(question).pipe(
          map((successResponse: IQuestion) => {
            return QuestionsActions.askQuestionSuccess({
              question: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.askQuestionFailure({ error }))
          )
        );
      })
    );
  });

  getQuestionComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestionComments),
      mergeMap((action) => {
        const { questionId } = action;
        return this.questionsService.getQuestionComments(questionId).pipe(
          map((successResponse: IComment[]) => {
            return QuestionsActions.getQuestionCommentsSuccess({
              comments: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.getQuestionCommentsFailure({ error }))
          )
        );
      })
    );
  });

  addCommentToQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.addCommentToQuestion),
      mergeMap((action) => {
        const { addCommentToAnswer } = action;
        return this.questionsService
          .addCommentToQuestion(addCommentToAnswer)
          .pipe(
            map((successResponse: IComment) => {
              return QuestionsActions.addCommentToQuestionSuccess({
                comment: successResponse,
              });
            }),
            catchError((error) =>
              of(QuestionsActions.addCommentToQuestionFailure({ error }))
            )
          );
      })
    );
  });

  upvoteQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.upvoteQuestion),
      mergeMap((action) => {
        const { questionId } = action;
        return this.questionsService.upvoteQuestion(questionId).pipe(
          map((successResponse: IMessage) => {
            return QuestionsActions.upvoteQuestionSuccess({
              message: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.upvoteQuestionFailure({ error }))
          )
        );
      })
    );
  });

  downvoteQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.downvoteQuestion),
      mergeMap((action) => {
        const { questionId } = action;
        return this.questionsService.downvoteQuestion(questionId).pipe(
          map((successResponse: IMessage) => {
            return QuestionsActions.downvoteQuestionSuccess({
              message: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.downvoteQuestionFailure({ error }))
          )
        );
      })
    );
  });

  getQuestionAnswers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestionAnswers),
      mergeMap((action) => {
        const { questionId } = action;
        return this.questionsService.getQuestionAnswers(questionId).pipe(
          map((successResponse: IAnswer[]) => {
            return QuestionsActions.getQuestionAnswersSuccess({
              answers: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.getQuestionAnswersFailure({ error }))
          )
        );
      })
    );
  });

  getQuestionAnswerComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.getQuestionAnswerComments),
      mergeMap((action) => {
        const { questionId, answerId } = action;
        return this.questionsService
          .getQuestionAnswerComments(questionId, answerId)
          .pipe(
            map((successResponse: IComment[]) => {
              return QuestionsActions.getQuestionAnswerCommentsSuccess({
                comments: successResponse,
              });
            }),
            catchError((error) =>
              of(QuestionsActions.getQuestionAnswerCommentsFailure({ error }))
            )
          );
      })
    );
  });

  addAnswerToQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.addAnswerToQuestion),
      mergeMap((action) => {
        const { addAnswer } = action;
        return this.questionsService.addAnswerToQuestion(addAnswer).pipe(
          map((successResponse: IAnswer) => {
            return QuestionsActions.addAnswerToQuestionSuccess({
              answer: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.addAnswerToQuestionFailure({ error }))
          )
        );
      })
    );
  });

  addCommentToAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.addCommentToAnswer),
      mergeMap((action) => {
        const { addComment } = action;
        return this.questionsService.addCommentToAnswer(addComment).pipe(
          map((successResponse: IComment) => {
            return QuestionsActions.addCommentToAnswerSuccess({
              comment: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.addCommentToAnswerFailure({ error }))
          )
        );
      })
    );
  });

  upvoteAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.upvoteAnswer),
      mergeMap((action) => {
        const { questionId, answerId } = action;
        return this.questionsService.upvoteAnswer(questionId, answerId).pipe(
          map((successResponse: IMessage) => {
            return QuestionsActions.upvoteAnswerSuccess({
              message: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.upvoteAnswerFailure({ error }))
          )
        );
      })
    );
  });

  downvoteAnswer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionsActions.downvoteAnswer),
      mergeMap((action) => {
        const { questionId, answerId } = action;
        return this.questionsService.downvoteAnswer(questionId, answerId).pipe(
          map((successResponse: IMessage) => {
            return QuestionsActions.downvoteAnswerSuccess({
              message: successResponse,
            });
          }),
          catchError((error) =>
            of(QuestionsActions.downvoteAnswerFailure({ error }))
          )
        );
      })
    );
  });
}
