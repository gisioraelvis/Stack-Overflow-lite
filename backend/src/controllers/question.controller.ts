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
import { QuestionCreateDto } from "../dtos/question.dto";
import { format } from "morgan";
import { formatQuestions } from "../utils/question.utils";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Get all questions
 * @route   GET /api/questions
 * @access  Public
 */
export const getAllQuestions = async (req: Request, res: Response) => {
  // optional pagination query params, page, itemsPerPage
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const questions = await dbUtils.exec("usp_GetAllQuestions");

    const formattedQuestions: IQuestion[] = questions.recordset
      .map((question: IQuestionObject) => {
        const user = {
          id: question.userId,
          name: question.userName,
          email: question.userEmail,
          avatar: question.userAvatar,
          isAdmin: question.userIsAdmin,
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
            return self.findIndex((t: ITag) => t.id === tag.id) === index;
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
      })
      .filter((question: IQuestion, index: number, self: IQuestion[]) => {
        return self.findIndex((q: IQuestion) => q.id === question.id) === index;
      });

    return res.status(200).json(formattedQuestions);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get a question by id
 * @route   GET /api/questions/:id
 * @access  Public
 */
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const questions = await dbUtils.exec("usp_GetQuestionById", { id });

    /*     const formattedQuestion: IQuestion = questions.recordset
      .map((question: IQuestionObject) => {
        const user = {
          id: question.userId,
          name: question.userName,
          email: question.userEmail,
          avatar: question.userAvatar,
          isAdmin: question.userIsAdmin,
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
            return self.findIndex((t: ITag) => t.id === tag.id) === index;
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
      })
      .filter((question: IQuestion, index: number, self: IQuestion[]) => {
        return self.findIndex((q: IQuestion) => q.id === question.id) === index;
      })[0]; */

    return res.status(200).json(formatQuestions(questions.recordset)[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get a question comments
 * @route   GET /api/questions/:id/comments
 * @access  Public
 */
export const getQuestionComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comments = await dbUtils.exec("usp_GetQuestionComments", { id });

    const formattedQuestionComments: IComment[] = comments.recordset.map(
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

    return res.status(200).json(formattedQuestionComments);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get a question answers
 * @route   GET /api/questions/:id/answers
 * @access  Public
 */
export const getQuestionAnswers = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const answers = await dbUtils.exec("usp_GetQuestionAnswers", { id });

    const formattedQuestionAnswers: IAnswer[] = answers.recordset.map(
      (answer: IAnswerObject) => {
        const user = {
          id: answer.userId,
          name: answer.userName,
          email: answer.userEmail,
          avatar: answer.userAvatar,
          isAdmin: answer.userIsAdmin,
        };

        return {
          id: answer.answerId,
          body: answer.answerBody,
          user,
          upvotes: answer.answerUpvotes,
          downvotes: answer.answerDownvotes,
          isAccepted: answer.answerIsAccepted,
          createdAt: answer.answerCreatedAt,
          updatedAt: answer.answerUpdatedAt,
        };
      }
    );

    return res.status(200).json(formattedQuestionAnswers);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Create a question
 * @route   POST /api/questions/ask
 * @access  Private
 */
export const createQuestion = async (req: IRequestWithUser, res: Response) => {
  const { error } = QuestionCreateDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { title, body, tags } = req.body;

  const user = req.user as IUser;

  try {
    const tagIds: number[] = [];
    // first check if the tags exist
    for (const tag of tags) {
      const tagExists = await dbUtils.exec("usp_GetTagByName", {
        name: tag.name,
      });

      if (tagExists.recordset.length === 0) {
        // if the tag doesn't exist yet
        const createdTag = await dbUtils.exec("usp_CreateTag", {
          name: tag.name,
          body: tag.body,
        });

        tagIds.push(createdTag.recordset[0].id);
      } else {
        // if the tag exists already
        tagIds.push(tagExists.recordset[0].id);
      }
    }

    const question = await dbUtils.exec("usp_CreateQuestion", {
      title,
      body,
      userId: user.id,
    });

    console.log(question.recordset[0].questionId);

    //create the question tags relation
    for (const tagId of tagIds) {
      await dbUtils.exec("usp_CreateQuestionTag", {
        questionId: question.recordset[0].questionId,
        tagId,
      });
    }

    const questions = await dbUtils.exec("usp_GetQuestionById", {
      id: question.recordset[0].questionId,
    });

    return res.status(200).json(formatQuestions(questions.recordset)[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
