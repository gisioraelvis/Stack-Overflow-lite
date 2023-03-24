import { IAnswer } from './IAnswer';
import { IComment } from './IComment';
import { ITag } from './ITag';
import { IUser } from './IUser';
import { IPagination } from './shared';

export interface IQuestion {
  id: number | string;
  title: string;
  body: string;
  user: IUser;
  upvotes: number;
  downvotes: number;
  totalAnswers: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  tags: ITag[];
  comments: IComment[];
  answers: IAnswer[];
}

export interface IQuestionsState {
  questions: IQuestion[];
  question: IQuestion;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface IQuestionSearch {
  searchTerm: string | undefined | null;
  pagination: IPagination;
}

interface ITagObject {
  name: string;
  body: string;
}

export interface IAskQuestion {
  title: string;
  body: string;
  tags: ITagObject[];
}

// update question
export interface IUpdateQuestion {
  id: number;
  title: string;
  body: string;
  tags: string[];
}
