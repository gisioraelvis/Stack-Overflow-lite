import { IAnswer } from './IAnswer';
import { IComment } from './IComment';
import { ITag } from './ITag';
import { IUser } from './IUser';

export interface IQuestion {
  id: number;
  title: string;
  body: string;
  user: IUser;
  upvotes: number;
  downvotes: number;
  answersCount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  tags: ITag[];
  comments: IComment[];
  answers: IAnswer[];
}
