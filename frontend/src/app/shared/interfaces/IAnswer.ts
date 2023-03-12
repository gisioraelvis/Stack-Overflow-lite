import { IUser } from './IUser';

export interface IAnswer {
  id: number;
  text: string;
  user: IUser;
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  updatedAt: Date;
}
