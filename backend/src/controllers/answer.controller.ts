import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IPagination } from "../interfaces/pagination.interface";
import {
  IQuestion,
  IQuestionObject,
  IQuestionObjectWithAnswers,
} from "../interfaces/question.interface";
import { ITag, ITagObject } from "../interfaces/tag.interface";
import { IAnswer, IAnswerObject } from "../interfaces/answer.interface";
import { IComment, ICommentObject } from "../interfaces/comment.interface";

const dbUtils = new DatabaseUtils();


/*
* @desc    Get answer comments
* @route   GET /api/questions/:id/answers/:id/comments
* @access  Public
*/
export const getAnswerComments = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const comments = await dbUtils.exec("usp_GetAnswerComments", { id });
  
      const formattedAnswerComments: IComment[] = comments.recordset.map(
        (comment: ICommentObject) => {
          const user = {
            id: comment.userId,
            name: comment.userName,
            email: comment.userEmail,
            avatar: comment.userAvatar,
            isAdmin: comment.userIsAdmin,
          };
  
          return {
            id: comment.commentId,
            body: comment.commentBody,
            user,
            createdAt: comment.commentCreatedAt,
            updatedAt: comment.commentUpdatedAt,
          };
        }
      );
  
      return res.status(200).json(formattedAnswerComments);
    } catch (error: any) {
      res.status(500).json(error.message);
      CreateLog.error(error);
    }
  };