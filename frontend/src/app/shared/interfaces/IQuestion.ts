import { IUser } from './IUser';

export interface IQTag {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IQuestion {
  id: number;
  title: string;
  description: string;
  tags: IQTag[];
  user: IUser;
  upvotes: number;
  downvotes: number;
  answersCount: number;
  createdAt: Date;
  updatedAt: Date;
}
