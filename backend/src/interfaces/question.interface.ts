import { IAnswer } from "./answer.interface";
import { IComment } from "./comment.interface";
import { ITag } from "./tag.interface";
import { IUser } from "./user.interface";

export interface IQuestion {
  id: number;
  title: string;
  body: string;
  user: IUser;
  upvotes: number;
  downvotes: number;
  isDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  tags: ITag[];
  comments: IComment[];
  answers: IAnswer[];
}
