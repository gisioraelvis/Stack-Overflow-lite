import { IComment } from "./comment.interface";
import { IUser } from "./user.interface";

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
