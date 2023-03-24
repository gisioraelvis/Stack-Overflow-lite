import { createReducer, on } from '@ngrx/store';
import { IQuestionsState } from 'src/app/shared/interfaces/IQuestion';
import * as QuestionsActions from '../actions/questions.actions';

export const initialState: IQuestionsState = {
  questions: [],
  question: {
    id: 0,
    title: '',
    body: '',
    user: {
      id: 0,
      name: '',
      email: '',
      avatar: '',
      bio: '',
      isDeleted: false,
      isAdmin: false,
      updatedAt: '',
      createdAt: '',
      JWT: '',
      userAnalytics: {
        totalQuestions: 0,
        totalAnswers: 0,
        totalComments: 0,
        totalTags: 0,
        totalVotes: 0,
        totalAcceptedAnswers: 0,
      },
    },
    upvotes: 0,
    downvotes: 0,
    totalAnswers: 0,
    createdAt: '',
    updatedAt: '',
    tags: [],
    comments: [],
    answers: [
      {
        id: 0,
        body: '',
        user: {
          id: 0,
          name: '',
          email: '',
          avatar: '',
          bio: '',
          isDeleted: false,
          isAdmin: false,
          updatedAt: '',
          createdAt: '',
          JWT: '',
          userAnalytics: {
            totalQuestions: 0,
            totalAnswers: 0,
            totalComments: 0,
            totalTags: 0,
            totalVotes: 0,
            totalAcceptedAnswers: 0,
          },
        },
        isAccepted: false,
        upvotes: 0,
        downvotes: 0,
        createdAt: '',
        updatedAt: '',
        comments: [],
      },
    ],
  },
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
  on(QuestionsActions.getQuestionsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
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
  }),
  on(QuestionsActions.getQuestionById, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.getQuestionByIdSuccess, (state, { question }) => {
    return {
      ...state,
      loading: false,
      question,
    };
  }),
  on(QuestionsActions.getQuestionByIdFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.askQuestion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.askQuestionSuccess, (state, { question }) => {
    return {
      ...state,
      loading: false,
      questions: [...state.questions, question],
    };
  }),
  on(QuestionsActions.askQuestionFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.getQuestionComments, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.getQuestionCommentsSuccess, (state, { comments }) => {
    return {
      ...state,
      loading: false,
      question: {
        ...state.question,
        comments,
      },
    };
  }),
  on(QuestionsActions.getQuestionCommentsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.addCommentToQuestion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.addCommentToQuestionSuccess, (state, { comment }) => {
    return {
      ...state,
      loading: false,
      question: {
        ...state.question,
        comments: [...state.question.comments, comment],
      },
    };
  }),
  on(QuestionsActions.addCommentToQuestionFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.upvoteQuestion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.upvoteQuestionSuccess, (state, { message }) => {
    return {
      ...state,
      loading: false,
      success: message.message,
    };
  }),
  on(QuestionsActions.upvoteQuestionFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.downvoteQuestion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.downvoteQuestionSuccess, (state, { message }) => {
    return {
      ...state,
      loading: false,
      success: message.message,
    };
  }),
  on(QuestionsActions.downvoteQuestionFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.getQuestionAnswerComments, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(
    QuestionsActions.getQuestionAnswerCommentsSuccess,
    (state, { comments }) => {
      return {
        ...state,
        loading: false,
        question: {
          ...state.question,
          answers: state.question.answers.map((answer) => {
            if (answer.id === comments[0].answerId) {
              return {
                ...answer,
                comments,
              };
            }
            return answer;
          }),
        },
      };
    }
  ),
  on(QuestionsActions.getQuestionAnswerCommentsFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.addAnswerToQuestion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.addAnswerToQuestionSuccess, (state, { answer }) => {
    return {
      ...state,
      loading: false,
      question: {
        ...state.question,
        answers: [...state.question.answers, answer],
      },
    };
  }),
  on(QuestionsActions.addAnswerToQuestionFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.addCommentToAnswer, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.addCommentToAnswerSuccess, (state, { comment }) => {
    return {
      ...state,
      loading: false,
      question: {
        ...state.question,
        answers: state.question.answers.map((answer) => {
          if (answer.id === comment.answerId) {
            return {
              ...answer,
              comments: [...answer.comments, comment],
            };
          }
          return answer;
        }),
      },
    };
  }),
  on(QuestionsActions.addCommentToAnswerFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.upvoteAnswer, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.upvoteAnswerSuccess, (state, { message }) => {
    return {
      ...state,
      loading: false,
      success: message.message,
    };
  }),
  on(QuestionsActions.upvoteAnswerFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.downvoteAnswer, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(QuestionsActions.downvoteAnswerSuccess, (state, { message }) => {
    return {
      ...state,
      loading: false,
      success: message.message,
    };
  }),
  on(QuestionsActions.downvoteAnswerFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      error,
    };
  }),
  on(QuestionsActions.clearQuestions, (state) => {
    return {
      ...state,
      questions: [],
    };
  }),
  on(QuestionsActions.clearError, (state) => {
    return {
      ...state,
      error: '',
    };
  }),
  on(QuestionsActions.clearSuccess, (state) => {
    return {
      ...state,
      success: '',
    };
  })
);
