import { IUser } from "./user.interface";

export interface IComment {
  id: number;
  body: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  questionId?: number | string;
  answerId?: number | string;
  user: IUser;
}

export interface ICommentObject {
  commentId: number;
  commentBody: string;
  commentCreatedAt: string;
  commentUpdatedAt: string;
  commentQuestionId: number;
  commentAnswerId: number;
  commentUserId: number;
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
