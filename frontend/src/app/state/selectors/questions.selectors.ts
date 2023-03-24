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

export const getQuestionsLoaded = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loaded
);

export const getQuestionsError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionsByUser = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.questions
);

export const getQuestionsByUserLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const getQuestionsByUserError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionById = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const getQuestionByIdLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const question = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const getQuestionByIdError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const askQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const askQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const askQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionComments = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const getQuestionCommentsLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const getQuestionCommentsError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const addCommentToQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const addCommentToQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const addCommentToQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const upvoteQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const upvoteQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const upvoteQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const downvoteQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const downvoteQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const downvoteQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionAnswers = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const getQuestionAnswersLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const getQuestionAnswersError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const addAnswerToQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const addAnswerToQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const addAnswerToQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionAnswerComments = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const getQuestionAnswerCommentsLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const addCommentToAnswer = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const addCommentToAnswerLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const addCommentToAnswerError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const getQuestionAnswerCommentsError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);
export const upvoteAnswer = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const upvoteAnswerLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const upvoteAnswerError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const downvoteAnswer = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question.answers
);

export const downvoteAnswerLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const downvoteAnswerError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const deleteQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const deleteQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const deleteQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);

export const updateQuestion = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.question
);

export const updateQuestionLoading = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.loading
);

export const updateQuestionError = createSelector(
  selectQuestionsState,
  (state: IQuestionsState) => state.error
);
