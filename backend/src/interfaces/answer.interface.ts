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
  comments?: IComment[];
  isDeleted?: boolean;
}

export interface IAnswerObject {
  answerId: number;
  answerUserId: number;
  answerBody: string;
  answerIsAccepted: boolean;
  answerUpvotes: number;
  answerDownvotes: number;
  answerIsDeleted: boolean;
  answerCreatedAt: string;
  answerUpdatedAt: string;
  userId: number;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userBio: string;
  userIsAdmin: boolean;
  userIsDeleted: boolean;
  userCreatedAt: string;
  userUpdatedAt: string;
}
