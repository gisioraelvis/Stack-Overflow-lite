import { createAction, props } from '@ngrx/store';
import { IPagination } from 'src/app/shared/interfaces/shared';
import {
  IAskQuestion,
  IQuestion,
  IUpdateQuestion,
} from 'src/app/shared/interfaces/IQuestion';
import { IAddComment, IComment } from 'src/app/shared/interfaces/IComment';
import { IAddAnswer, IAnswer, IUpdateAnswer } from 'src/app/shared/interfaces/IAnswer';
import { IMessage } from 'src/app/shared/interfaces/IMessage';

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

export const getQuestionById = createAction(
  '[Questions] Get Question By Id',
  props<{ id: string | number }>()
);

export const getQuestionByIdSuccess = createAction(
  '[Questions] Get Question By Id Success',
  props<{ question: IQuestion }>()
);

export const getQuestionByIdFailure = createAction(
  '[Questions] Get Question By Id Failure',
  props<{ error: string }>()
);

export const askQuestion = createAction(
  '[Questions] Ask Question',
  props<{ question: IAskQuestion }>()
);

export const askQuestionSuccess = createAction(
  '[Questions] Ask Question Success',
  props<{ question: IQuestion }>()
);

export const askQuestionFailure = createAction(
  '[Questions] Ask Question Failure',
  props<{ error: string }>()
);

export const updateQuestion = createAction(
  '[Questions] Update Question',
  props<{ question: IUpdateQuestion }>()
);

export const updateQuestionSuccess = createAction(
  '[Questions] Update Question Success',
  props<{ question: IQuestion }>()
);

export const updateQuestionFailure = createAction(
  '[Questions] Update Question Failure',
  props<{ error: string }>()
);

export const getQuestionComments = createAction(
  '[Questions] Get Question Comments',
  props<{ questionId: string | number }>()
);

export const getQuestionCommentsSuccess = createAction(
  '[Questions] Get Question Comments Success',
  props<{ comments: IComment[] }>()
);

export const getQuestionCommentsFailure = createAction(
  '[Questions] Get Question Comments Failure',
  props<{ error: string }>()
);

export const addCommentToQuestion = createAction(
  '[Questions] Add Comment To Question',
  props<{ addCommentToAnswer: IAddComment }>()
);

export const addCommentToQuestionSuccess = createAction(
  '[Questions] Add Comment To Question Success',
  props<{ comment: IComment }>()
);

export const addCommentToQuestionFailure = createAction(
  '[Questions] Add Comment To Question Failure',
  props<{ error: string }>()
);

export const upvoteQuestion = createAction(
  '[Questions] Upvote Question',
  props<{ questionId: string | number }>()
);

export const upvoteQuestionSuccess = createAction(
  '[Questions] Upvote Question Success',
  props<{ message: IMessage }>()
);

export const upvoteQuestionFailure = createAction(
  '[Questions] Upvote Question Failure',
  props<{ error: string }>()
);

export const downvoteQuestion = createAction(
  '[Questions] Downvote Question',
  props<{ questionId: string | number }>()
);

export const downvoteQuestionSuccess = createAction(
  '[Questions] Downvote Question Success',
  props<{ message: IMessage }>()
);

export const downvoteQuestionFailure = createAction(
  '[Questions] Downvote Question Failure',
  props<{ error: string }>()
);

export const getQuestionAnswers = createAction(
  '[Questions] Get Question Answers',
  props<{ questionId: string | number }>()
);

export const getQuestionAnswersSuccess = createAction(
  '[Questions] Get Question Answers Success',
  props<{ answers: IAnswer[] }>()
);

export const getQuestionAnswersFailure = createAction(
  '[Questions] Get Question Answers Failure',
  props<{ error: string }>()
);

export const getQuestionAnswerComments = createAction(
  '[Questions] Get Question Answer Comments',
  props<{ questionId: string | number; answerId: string | number }>()
);

export const getQuestionAnswerCommentsSuccess = createAction(
  '[Questions] Get Question Answer Comments Success',
  props<{ comments: IComment[] }>()
);

export const getQuestionAnswerCommentsFailure = createAction(
  '[Questions] Get Question Answer Comments Failure',
  props<{ error: string }>()
);

export const addAnswerToQuestion = createAction(
  '[Questions] Add Answer To Question',
  props<{ addAnswer: IAddAnswer }>()
);

export const addAnswerToQuestionSuccess = createAction(
  '[Questions] Add Answer To Question Success',
  props<{ answer: IAnswer }>()
);

export const addAnswerToQuestionFailure = createAction(
  '[Questions] Add Answer To Question Failure',
  props<{ error: string }>()
);

export const updateQuestionAnswer = createAction(
  '[Questions] Update Question Answer',
  props<{ updateAnswer: IUpdateAnswer }>()
);

export const updateQuestionAnswerSuccess = createAction(
  '[Questions] Update Question Answer Success',
  props<{ answer: IQuestion }>()
);

export const updateQuestionAnswerFailure = createAction(
  '[Questions] Update Question Answer Failure',
  props<{ error: string }>()
);

export const addCommentToAnswer = createAction(
  '[Questions] Add Comment To Answer',
  props<{ addComment: IAddComment }>()
);

export const addCommentToAnswerSuccess = createAction(
  '[Questions] Add Comment To Answer Success',
  props<{ comment: IComment }>()
);

export const addCommentToAnswerFailure = createAction(
  '[Questions] Add Comment To Answer Failure',
  props<{ error: string }>()
);

export const upvoteAnswer = createAction(
  '[Questions] Upvote Answer',
  props<{ questionId: string | number; answerId: string | number }>()
);

export const upvoteAnswerSuccess = createAction(
  '[Questions] Upvote Answer Success',
  props<{ message: IMessage }>()
);

export const upvoteAnswerFailure = createAction(
  '[Questions] Upvote Answer Failure',
  props<{ error: string }>()
);

export const downvoteAnswer = createAction(
  '[Questions] Downvote Answer',
  props<{ questionId: string | number; answerId: string | number }>()
);

export const downvoteAnswerSuccess = createAction(
  '[Questions] Downvote Answer Success',
  props<{ message: IMessage }>()
);

export const downvoteAnswerFailure = createAction(
  '[Questions] Downvote Answer Failure',
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
