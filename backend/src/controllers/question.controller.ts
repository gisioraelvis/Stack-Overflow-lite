import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
// import { IQuestion } from "../interfaces/product.interface";
import { IPagination } from "../interfaces/pagination.interface";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Fetch all questions
 * @route   GET /api/questions
 * @access  Public
 */
// export const getAllQuestions = async (req: Request, res: Response) => {
//   // optional pagination query params, page, itemsPerPage
//   const { page, itemsPerPage } = req.query;

//   const pagination: IPagination = {
//     page: page ? +page : 1,
//     itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
//   };

//   try {
//     const questions = await dbUtils.exec("usp_GetAllQuestions", {
//       page: pagination.page,
//       itemsPerPage: pagination.itemsPerPage,
//     });

//     if (questions.recordset.length > 0) {
//       return res.status(200).json(questions.recordset);
//     }

//     // if no questions found return empty array
//     if (questions.recordset.length === 0) {
//       return res.status(200).json(questions.recordset);
//     }
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };

export const getAllQuestions = async (req: Request, res: Response) => {
    // optional pagination query params, page, itemsPerPage
    const { page, itemsPerPage } = req.query;
  
    const pagination: IPagination = {
      page: page ? +page : 1,
      itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
    };
  
    try {
      const questions = await dbUtils.exec("usp_GetAllQuestions", {
        page: pagination.page,
        itemsPerPage: pagination.itemsPerPage,
      });
  
      const formattedQuestions = questions.recordset.map((question: any) => {
        const user = {
          id: question.userId,
          name: question.userName,
          email: question.userEmail,
          password: question.userPassword,
          avatar: question.userAvatar,
          bio: question.userBio,
          isAdmin: question.userIsAdmin,
          isDeleted: question.userIsDeleted,
          createdAt: question.userCreatedAt,
          updatedAt: question.userUpdatedAt,
        };
  
        const tags = questions.recordset
          .filter((q: any) => q.questionId === question.questionId)
          .map((q: any) => {
            return {
              id: q.tagId,
              name: q.tagName,
              body: q.tagBody,
              createdAt: q.tagCreatedAt,
              updatedAt: q.tagUpdatedAt,
            };
          });
  
        const comments = questions.recordset
          .filter((q: any) => q.questionId === question.questionId)
          .map((q: any) => {
            return {
              id: q.commentId,
              body: q.commentBody,
              createdAt: q.commentCreatedAt,
              updatedAt: q.commentUpdatedAt,
              questionId: q.commentQuestionId,
              answerId: q.commentAnswerId,
              user: {
                id: q.commentUserId,
              },
            };
          });
  
        const answers = questions.recordset
          .filter((q: any) => q.questionId === question.questionId)
          .map((q: any) => {
            return {
              id: q.answerId,
              body: q.answerBody,
              isAccepted: q.answerIsAccepted,
              upvotes: q.answerUpvotes,
              downvotes: q.answerDownvotes,
              createdAt: q.answerCreatedAt,
              updatedAt: q.answerUpdatedAt,
              user: {
                id: q.answerUserId,
              },
              comments: questions.recordset
                .filter((c: any) => c.answerId === q.answerId)
                .map((c: any) => {
                  return {
                    id: c.commentId,
                    body: c.commentBody,
                    createdAt: c.commentCreatedAt,
                    updatedAt: c.commentUpdatedAt,
                    questionId: c.commentQuestionId,
                    answerId: c.commentAnswerId,
                    user: {
                      id: c.commentUserId,
                    },
                  };
                }),
            };
          });
  
        return {
          id: question.questionId,
          title: question.questionTitle,
          body: question.questionBody,
          user,
          upvotes: question.questionUpvotes,
          downvotes: question.questionDownvotes,
          isDeleted: question.questionIsDeleted,
          createdAt: question.questionCreatedAt,
          updatedAt: question.questionUpdatedAt,
          tags,
          comments,
          answers,
        };
      });
  
      return res.status(200).json(formattedQuestions);
    } catch (error: any) {
      res.status(500).json(error.message);
      CreateLog.error(error);
    }
  };
