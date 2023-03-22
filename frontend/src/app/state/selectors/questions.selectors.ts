import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IQuestionsState } from 'src/app/shared/interfaces/IQuestion';

export const selectQuestionsState =
  createFeatureSelector<IQuestionsState>('questions');

export const questions = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.questions
);

export const getQuestionsLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const getQuestionsError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);
