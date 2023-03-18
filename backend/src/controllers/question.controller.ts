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
import { ICommentObject } from "../interfaces/comment.interface";

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
//     const questions = await dbUtils.exec("usp_GetAllQuestions");

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

// export const getAllQuestions = async (req: Request, res: Response) => {
//   // optional pagination query params, page, itemsPerPage
//   const { page, itemsPerPage } = req.query;

//   const pagination: IPagination = {
//     page: page ? +page : 1,
//     itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
//   };

//   try {
//     const questions = await dbUtils.exec("usp_GetAllQuestions");

//     const formattedQuestions = questions.recordset
//       .map((question: any) => {
//         const user = {
//           id: question.userId,
//           name: question.userName,
//           email: question.userEmail,
//           password: question.userPassword,
//           avatar: question.userAvatar,
//           bio: question.userBio,
//           isAdmin: question.userIsAdmin,
//           isDeleted: question.userIsDeleted,
//           createdAt: question.userCreatedAt,
//           updatedAt: question.userUpdatedAt,
//         };

//         const tags = questions.recordset
//           .filter((q: any) => q.questionId === question.questionId)
//           .map((q: any) => {
//             return {
//               id: q.tagId,
//               name: q.tagName,
//               body: q.tagBody,
//               createdAt: q.tagCreatedAt,
//               updatedAt: q.tagUpdatedAt,
//             };
//           })
//           .filter((tag: any, index: number, self: any) => {
//             return self.findIndex((t: any) => t.id === tag.id) === index;
//           });

//         // const comments = questions.recordset
//         //   .filter((q: any) => q.questionId === question.questionId)
//         //   .map((q: any) => {
//         //     return {
//         //       id: q.commentId,
//         //       body: q.commentBody,
//         //       createdAt: q.commentCreatedAt,
//         //       updatedAt: q.commentUpdatedAt,
//         //       questionId: q.commentQuestionId,
//         //       answerId: q.commentAnswerId,
//         //       user: {
//         //         id: q.commentUserId,
//         //       },
//         //     };
//         //   });

//         // const answers = questions.recordset
//         //   .filter((q: any) => q.questionId === question.questionId)
//         //   .map((q: any) => {
//         //     return {
//         //       id: q.answerId,
//         //       body: q.answerBody,
//         //       isAccepted: q.answerIsAccepted,
//         //       upvotes: q.answerUpvotes,
//         //       downvotes: q.answerDownvotes,
//         //       createdAt: q.answerCreatedAt,
//         //       updatedAt: q.answerUpdatedAt,
//         //       user: {
//         //         id: q.answerUserId,
//         //       },
//         //       comments: questions.recordset
//         //         .filter((c: any) => c.answerId === q.answerId)
//         //         .map((c: any) => {
//         //           return {
//         //             id: c.commentId,
//         //             body: c.commentBody,
//         //             createdAt: c.commentCreatedAt,
//         //             updatedAt: c.commentUpdatedAt,
//         //             questionId: c.commentQuestionId,
//         //             answerId: c.commentAnswerId,
//         //             user: {
//         //               id: c.commentUserId,
//         //             },
//         //           };
//         //         }),
//         //     };
//         //   });

//         return {
//           id: question.questionId,
//           title: question.questionTitle,
//           body: question.questionBody,
//           user,
//           upvotes: question.questionUpvotes,
//           downvotes: question.questionDownvotes,
//           isDeleted: question.questionIsDeleted,
//           createdAt: question.questionCreatedAt,
//           updatedAt: question.questionUpdatedAt,
//           tags,
//           // comments,
//           // answers,
//         };
//       })
//       .slice(
//         (pagination.page - 1) * pagination.itemsPerPage,
//         pagination.page * pagination.itemsPerPage
//       );

//     return res.status(200).json(formattedQuestions);
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
    const questions = await dbUtils.exec("usp_GetAllQuestions");

    const formattedQuestions = questions.recordset.map(
      (question: IQuestionObject) => {
        const user = {
          id: question.userId,
          name: question.userName,
          email: question.userEmail,
          avatar: question.userAvatar,
          bio: question.userBio,
          isAdmin: question.userIsAdmin,
          isDeleted: question.userIsDeleted,
          createdAt: question.userCreatedAt,
          updatedAt: question.userUpdatedAt,
        };

        const tags = questions.recordset
          .filter((q: IQuestionObject) => q.questionId === question.questionId)
          .map((q: ITagObject) => {
            return {
              id: q.tagId,
              name: q.tagName,
              body: q.tagBody,
              createdAt: q.tagCreatedAt,
              updatedAt: q.tagUpdatedAt,
            };
          })
          .filter((tag: ITag, index: number, self: ITag[]) => {
            return self.findIndex((t: any) => t.id === tag.id) === index;
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
        };
      }
    );

    return res.status(200).json(formattedQuestions);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * Get question by id
 * route GET /api/questions/:id
 * @access public
 */
// export const getQuestionById = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const questions = await dbUtils.exec("usp_GetQuestionById", {
//       id,
//     });

//     const questionId = new Set();
//     const formattedQuestion = questions.recordset
//       .map((question: IQuestionObjectWithAnswers) => {
//         const user = {
//           id: question.userId,
//           name: question.userName,
//           email: question.userEmail,
//           avatar: question.userAvatar,
//           bio: question.userBio,
//           isAdmin: question.userIsAdmin,
//           isDeleted: question.userIsDeleted,
//           createdAt: question.userCreatedAt,
//           updatedAt: question.userUpdatedAt,
//         };

//         const tagIds = new Set();
//         const tags = questions.recordset
//           .filter((q: any) => q.questionId === question.questionId)
//           .map((q: any) => {
//             return {
//               id: q.tagId,
//               name: q.tagName,
//               body: q.tagBody,
//               createdAt: q.tagCreatedAt,
//               updatedAt: q.tagUpdatedAt,
//             };
//           })
//           .filter((tag: any) => {
//             if (tagIds.has(tag.id)) {
//               return false;
//             } else {
//               tagIds.add(tag.id);
//               return true;
//             }
//           });

//         const commentIds = new Set();
//         const comments = questions.recordset
//           .filter(
//             (q: IQuestionObjectWithAnswers) =>
//               q.questionId === question.questionId
//           )
//           .map((q: ICommentObject) => {
//             return {
//               id: q.commentId,
//               body: q.commentBody,
//               createdAt: q.commentCreatedAt,
//               updatedAt: q.commentUpdatedAt,
//               questionId: q.commentQuestionId,
//               answerId: q.commentAnswerId,
//               user: {
//                 id: q.commentUserId,
//               },
//             };
//           })
//           .filter((comment: any) => {
//             if (commentIds.has(comment.id)) {
//               return false;
//             } else {
//               commentIds.add(comment.id);
//               return true;
//             }
//           });

//         const anwerIds = new Set();
//         const commentAnswerIds = new Set();
//         const answers = questions.recordset
//           .filter(
//             (q: IQuestionObjectWithAnswers) =>
//               q.questionId === question.questionId
//           )
//           .map((q: IAnswerObject) => {
//             return {
//               id: q.answerId,
//               body: q.answerBody,
//               isAccepted: q.answerIsAccepted,
//               upvotes: q.answerUpvotes,
//               downvotes: q.answerDownvotes,
//               createdAt: q.answerCreatedAt,
//               updatedAt: q.answerUpdatedAt,
//               user: {
//                 id: q.answerUserId,
//                 name: q.userName,
//                 avatar: q.userAvatar,
//               },
//               comments: questions.recordset
//                 .filter(
//                   (c: IQuestionObjectWithAnswers) => c.answerId === q.answerId
//                 )
//                 .map((c: ICommentObject) => {
//                   return {
//                     id: c.commentId,
//                     body: c.commentBody,
//                     createdAt: c.commentCreatedAt,
//                     updatedAt: c.commentUpdatedAt,
//                     questionId: c.commentQuestionId,
//                     answerId: c.commentAnswerId,
//                     user: {
//                       id: c.commentUserId,
//                       name: c.userName,
//                       avatar: c.userAvatar,
//                     },
//                   };
//                 })
//                 .filter((comment: any) => {
//                   if (commentAnswerIds.has(comment.id)) {
//                     return false;
//                   } else {
//                     commentAnswerIds.add(comment.id);
//                     return true;
//                   }
//                 }),
//             };
//           })
//           .filter((answer: any) => {
//             if (anwerIds.has(answer.id)) {
//               return false;
//             } else {
//               anwerIds.add(answer.id);
//               return true;
//             }
//           });

//         return {
//           id: question.questionId,
//           title: question.questionTitle,
//           body: question.questionBody,
//           user,
//           upvotes: question.questionUpvotes,
//           downvotes: question.questionDownvotes,
//           isDeleted: question.questionIsDeleted,
//           createdAt: question.questionCreatedAt,
//           updatedAt: question.questionUpdatedAt,
//           // tags,
//           // comments,
//           answers,
//         };
//       })
//       .filter((question: any) => {
//         if (questionId.has(question.id)) {
//           return false;
//         } else {
//           questionId.add(question.id);
//           return true;
//         }
//       });

//     return res.status(200).json(formattedQuestion);
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };
