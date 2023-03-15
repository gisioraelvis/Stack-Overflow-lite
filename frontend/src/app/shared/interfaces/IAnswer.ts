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
