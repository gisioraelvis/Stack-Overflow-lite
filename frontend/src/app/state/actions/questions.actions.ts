import { createAction, props } from '@ngrx/store';
import { IPagination } from 'src/app/shared/interfaces/IPagination';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';

export const getQuestions = createAction(
  '[Questions] Load Questions',
  props<IPagination>()
);

export const getQuestionsSuccess = createAction(
  '[Questions] Load Questions Success',
  props<{ questions: IQuestion[] }>()
);

export const loadQuestionsFailure = createAction(
  '[Questions] Load Questions Failure',
  props<{ error: string }>()
);

export const addQuestion = createAction(
  '[Questions] Add Question',
  props<{ question: IQuestion }>()
);

export const upvoteQuestion = createAction(
  '[Questions] Upvote Question',
  props<{ questionId: string; userId: string }>()
);

export const searchQuestions = createAction(
  '[Questions] Search Questions',
  props<{
    searchTerm: string | undefined | null;
    page: number;
    itemsPerPage: number;
  }>()
);

export const searchQuestionsSuccess = createAction(
  '[Questions] Search Questions Success',
  props<{ questions: IQuestion[] }>()
);

export const searchQuestionsFailure = createAction(
  '[Questions] Search Questions Failure',
  props<{ error: string }>()
);

export const getQuestionsByUser = createAction(
  '[Questions] Get User Questions',
  props<{ userId: string; pagination: IPagination }>()
);

export const getQuestionsByUserSuccess = createAction(
  '[Questions] Get User Questions Success',
  props<{ questions: IQuestion[] }>()
);

export const getQuestionsByUserFailure = createAction(
  '[Questions] Get User Questions Failure',
  props<{ error: string }>()
);
