import { IUser } from './IUser';

export interface ITag {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  id: number;
  title: string;
  description: string;
  tags: ITag[];
  user: IUser;
  upvotes: number;
  downvotes: number;
  answersCount: number;
  time: Date;
}
