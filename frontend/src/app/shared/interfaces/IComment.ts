import { IUser } from './IUser';

export interface IComment {
  id: number;
  body: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  questionId: number;
  answerId: number;
  user: IUser;
}
