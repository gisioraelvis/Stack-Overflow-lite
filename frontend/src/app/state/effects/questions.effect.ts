import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import * as QuestionsActions from '../actions/questions.actions';
import { of } from 'rxjs';
import { QuestionsService } from 'src/app/pages/questions/questions.service';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private questionsService: QuestionsService
  ) {}

  loadQuestions$ = createEffect(() => {
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
          catchError((error) => of(QuestionsActions.loadQuestionsFailure({ error })))
        );
      })
    );
  });
}
