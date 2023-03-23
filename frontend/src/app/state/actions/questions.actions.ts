import { createAction, props } from '@ngrx/store';
import { IPagination } from 'src/app/shared/interfaces/IPagination';
import { IQuestion } from 'src/app/shared/interfaces/IQuestion';

export const getQuestions = createAction(
  '[Questions] Get Questions',
  props<IPagination>()
);

export const getQuestionsSuccess = createAction(
  '[Questions] Get Questions Success',
  props<{ questions: IQuestion[] }>()
);

export const getQuestionsFailure = createAction(
  '[Questions] Get Questions Failure',
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

export const deleteQuestion = createAction(
  '[Questions] Delete Question',
  props<{ id: string | number }>()
);

export const deleteQuestionSuccess = createAction(
  '[Questions] Delete Question Success',
  props<{ id: number; message: string }>()
);

export const deleteQuestionFailure = createAction(
  '[Questions] Delete Question Failure',
  props<{ error: string }>()
);

export const clearQuestions = createAction('[Questions] Clear Questions');
export const clearError = createAction('[Questions] Clear Error');
export const clearSuccess = createAction('[Questions] Clear Success');
