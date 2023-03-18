import { IAnswer } from "./answer.interface";
import { IComment } from "./comment.interface";
import { ITag } from "./tag.interface";
import { IUser } from "./user.interface";

export interface IQuestion {
  id: number | string;
  title: string;
  body: string;
  user: IUser;
  upvotes: number;
  downvotes: number;
  isDeleted?: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  tags: ITag[];
}

export interface IQuestionObject {
  questionId: number;
  questionUserId: number;
  questionTitle: string;
  questionBody: string;
  questionUpvotes: number;
  questionDownvotes: number;
  questionIsDeleted: boolean;
  questionCreatedAt: string;
  questionUpdatedAt: string;
  userId: number;
  userName: string;
  userEmail: string;
  userAvatar: string;
  userBio: string;
  userIsAdmin: boolean;
  userIsDeleted: boolean;
  userCreatedAt: string;
  userUpdatedAt: string;
  tagId: number;
  tagName: string;
  tagBody: string;
  tagCreatedAt: string;
  tagUpdatedAt: string;
}

/* 
{
        "questionId": 1,
        "questionUserId": 2,
        "questionTitle": "How do I create a database in SQL Server?",
        "questionBody": "I am trying to create a database in SQL Server but I am getting an error. Can someone help me?",
        "questionUpvotes": 0,
        "questionDownvotes": 0,
        "questionIsDeleted": false,
        "questionCreatedAt": "2023-03-17T16:07:10.673Z",
        "questionUpdatedAt": "2023-03-17T16:07:10.673Z",
        "userId": 2,
        "userName": "John Doe",
        "userEmail": "johndoe@example.com",
        "userAvatar": "https://www.gravatar.com/avatar/",
        "userBio": "This is the bio field for the user",
        "userIsAdmin": false,
        "userIsDeleted": false,
        "userCreatedAt": "2023-03-17T16:07:10.660Z",
        "userUpdatedAt": "2023-03-17T16:07:10.660Z",
        "tagId": 1,
        "tagName": "SQL",
        "tagBody": "SQL is a standard language for storing, manipulating and retrieving data in databases.",
        "tagCreatedAt": "2023-03-17T16:07:10.753Z",
        "tagUpdatedAt": "2023-03-17T16:07:10.753Z",
        "answerId": 1,
        "answerUserId": 2,
        "answerQuestionId": 1,
        "answerBody": "You need to use the CREATE DATABASE statement.",
        "answerUpvotes": 0,
        "answerDownvotes": 0,
        "answerIsAccepted": false,
        "answerIsDeleted": false,
        "answerCreatedAt": "2023-03-17T16:07:10.703Z",
        "answerUpdatedAt": "2023-03-17T16:07:10.703Z",
        "commentId": 1,
        "commentUserId": 2,
        "commentQuestionId": 1,
        "commentAnswerId": null,
        "commentBody": "This is a comment.",
        "commentIsDeleted": false,
        "commentCreatedAt": "2023-03-17T16:07:10.717Z",
        "commentUpdatedAt": "2023-03-17T16:07:10.717Z"
    },
*/

export interface IQuestionObjectWithAnswers extends IQuestionObject {
  answerId: number;
  answerUserId: number;
  answerQuestionId: number;
  answerBody: string;
  answerUpvotes: number;
  answerDownvotes: number;
  answerIsAccepted: boolean;
  answerIsDeleted: boolean;
  answerCreatedAt: string;
  answerUpdatedAt: string;
  commentId?: number;
  commentUserId?: number;
  commentQuestionId?: number;
  commentAnswerId?: number;
  commentBody?: string;
  commentIsDeleted?: boolean;
  commentCreatedAt?: string;
  commentUpdatedAt?: string;
}
