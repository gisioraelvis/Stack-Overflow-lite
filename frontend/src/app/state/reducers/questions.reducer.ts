import { createReducer, on } from '@ngrx/store';
import { IQuestionsState } from 'src/app/shared/interfaces/IQuestion';
import * as QuestionsActions from '../actions/questions.actions';

export const initialState: IQuestionsState = {
  questions: [],
  question: null,
  loading: false,
  loaded: false,
  error: '',
};

export const questionsReducer = createReducer(
  initialState,
  on(QuestionsActions.getQuestions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.getQuestionsSuccess, (state, { questions }) => {
    return {
      ...state,
      loading: false,
      questions: [...questions],
    };
  }),
  on(QuestionsActions.loadQuestionsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.addQuestion, (state, { question }) => {
    return {
      ...state,
      questions: [...state.questions, question],
    };
  }),
  on(QuestionsActions.searchQuestions, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.searchQuestionsSuccess, (state, { questions }) => {
    return {
      ...state,
      loading: false,
      questions: [...questions],
    };
  }),
  on(QuestionsActions.searchQuestionsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.getQuestionsByUser, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.getQuestionsByUserSuccess, (state, { questions }) => {
    return {
      ...state,
      loading: false,
      questions: [...questions],
    };
  }),
  on(QuestionsActions.getQuestionsByUserFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  })
);
