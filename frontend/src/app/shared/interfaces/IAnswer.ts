import { IComment } from './IComment';
import { IUser } from './IUser';

export interface IAnswer {
  id: number;
  body: string;
  user: IUser;
  isAccepted: boolean;
  upvotes: number;
  downvotes: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  comments: IComment[];
}

export interface IAddAnswer {
  questionId: number | string;
  body: string;
}

export interface IUpdateAnswer {
  questionId: number | string;
  answerId: number | string;
  body: string;
}

export interface IUpdateAnswerComment {
  commentId: string,
  body: string
  answerId: string,
  questionId: string,
}
