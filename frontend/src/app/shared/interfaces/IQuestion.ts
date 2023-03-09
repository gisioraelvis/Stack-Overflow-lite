import { IUser } from './IUser';

export interface IQuestion {
  id: number;
  title: string;
  description: string;
  tags: string[];
  user: IUser;
  time: Date;
}
