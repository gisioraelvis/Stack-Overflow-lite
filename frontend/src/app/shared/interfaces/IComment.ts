import { IUser } from './IUser';

export interface IComment {
  id: number | string;
  body: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  questionId: number | string;
  answerId: number | string;
  user: IUser;
}

export interface IAddComment {
  body: string;
  questionId: number | string;
  answerId: number | string;
}

export interface IUpdateComment {
  questionId: string,
  answerId: string,
  commentId: string,
  body: string
}
