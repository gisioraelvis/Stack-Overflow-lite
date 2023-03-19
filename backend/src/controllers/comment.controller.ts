import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { formatQuestionComments } from "../utils/question.utils";
import { CommentCreateDto, CommentUpdateDto } from "../dtos/answer.dto";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Get a question comments
 * @route   GET /api/questions/:id/comments
 * @access  Public
 */
export const getQuestionComments = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comments = await dbUtils.exec("usp_GetQuestionComments", { id });

    if (comments.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    return res.status(200).json(formatQuestionComments(comments.recordset));
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/**
 * @desc    Create a question comment
 * @route   POST /api/questions/:id/comments
 * @access  Private
 */
export const createQuestionComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = CommentCreateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }
  const { questionId } = req.params;
  const { body } = req.body;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const comment = await dbUtils.exec("usp_CreateQuestionComment", {
      questionId,
      userId: user.id,
      body,
    });

    return res.status(201).json(comment.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/**
 * @desc    Update a question comment
 * @route   PUT /api/questions/:questionId/comments/:commentId
 * @access  Private
 */
export const updateQuestionComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = CommentUpdateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }
  const { questionId, commentId } = req.params;
  const { body } = req.body;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const comment = await dbUtils.exec("usp_GetQuestionCommentById", {
      questionId,
      commentId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on question id ${questionId}`,
      });
    }

    const updatedComment = await dbUtils.exec("usp_UpdateComment", {
      id: commentId,
      body,
    });

    return res.status(200).json(updatedComment.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Delete a question comment
 * @route   DELETE /api/questions/:questionId/comments/:commentId
 * @access  Private
 */
export const deleteQuestionComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { questionId, commentId } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const comment = await dbUtils.exec("usp_GetQuestionCommentById", {
      questionId,
      commentId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on question id ${questionId}`,
      });
    }

    const commentUserOwner = await dbUtils.exec("usp_FindUserById", {
      id: user.id,
    });
    const owner = commentUserOwner.recordset[0];
    if (comment.recordset[0].userId !== user.id && !owner.isAdmin) {
      return res.status(403).json({
        message: "Question comment can only be deleted by the owner or admin",
      });
    }

    await dbUtils.exec("usp_DeleteComment", {
      id: commentId,
    });

    await dbUtils.exec("usp_DeleteComment", { id: commentId });

    return res.status(200).json({ message: "Comment deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Get a question comment by id
 * @route   GET /api/questions/:id/comments/:commentId
 * @access  Public
 */
export const getQuestionCommentById = async (req: Request, res: Response) => {
  const { id, commentId } = req.params;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const comment = await dbUtils.exec("usp_GetQuestionCommentById", {
      questionId: id,
      commentId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on question id ${id}`,
      });
    }

    return res.status(200).json(comment.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Get answer comments
 * @route   GET /api/questions/:questionId/answers/:answerId/comments
 * @access  Public
 */
export const getAnswerComments = async (req: Request, res: Response) => {
  const { questionId, answerId } = req.params;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const answer = await dbUtils.exec("usp_GetQuestionAnswerById", {
      questionId,
      answerId,
    });
    if (answer.recordset.length === 0) {
      return res.status(404).json({
        message: `Answer id ${answerId} does not exist on question id ${questionId}`,
      });
    }

    const comments = await dbUtils.exec("usp_GetAnswerComments", {
      id: questionId,
    });

    if (comments.recordset.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(formatQuestionComments(comments.recordset));
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Get answer comment by id
 * @route   GET /api/questions/:questionId/answers/:answerId/comments/:commentId
 * @access  Public
 */
export const getAnswerCommentById = async (req: Request, res: Response) => {
  const { questionId, answerId, commentId } = req.params;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const answer = await dbUtils.exec("usp_GetQuestionAnswerById", {
      questionId,
      answerId,
    });
    if (answer.recordset.length === 0) {
      return res.status(404).json({
        message: `Answer id ${answerId} does not exist on question id ${questionId}`,
      });
    }

    const comment = await dbUtils.exec("usp_GetAnswerCommentById", {
      id: commentId,
      answerId: answerId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on answer id ${answerId}`,
      });
    }

    return res.status(200).json(comment.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Create answer comment
 * @route   POST /api/questions/:questionId/answers/:answerId/comments
 * @access  Private
 */
export const createAnswerComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = CommentCreateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }
  const { questionId, answerId } = req.params;
  const { body } = req.body;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const answer = await dbUtils.exec("usp_GetQuestionAnswerById", {
      questionId,
      answerId,
    });
    if (answer.recordset.length === 0) {
      return res.status(404).json({
        message: `Answer id ${answerId} does not exist on question id ${questionId}`,
      });
    }

    const comment = await dbUtils.exec("usp_CreateQuestionAnswerComment", {
      answerId,
      userId: user.id,
      body,
    });

    return res.status(201).json(comment.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Update answer comment
 * @route   PUT /api/questions/:questionId/answers/:answerId/comments/:commentId
 * @access  Private (only comment owner or admin)
 */
export const updateAnswerComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = CommentUpdateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }
  const { questionId, answerId, commentId } = req.params;
  const { body } = req.body;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const answer = await dbUtils.exec("usp_GetQuestionAnswerById", {
      questionId,
      answerId,
    });
    if (answer.recordset.length === 0) {
      return res.status(404).json({
        message: `Answer id ${answerId} does not exist on question id ${questionId}`,
      });
    }

    const comment = await dbUtils.exec("usp_GetQuestionAnswerCommentById", {
      answerId,
      commentId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on answer id ${answerId}`,
      });
    }

    const commentUserOwner = await dbUtils.exec("usp_FindUserById", {
      id: user.id,
    });
    const owner = commentUserOwner.recordset[0];
    if (comment.recordset[0].userId !== user.id && !owner.isAdmin) {
      return res.status(403).json({
        message:
          "Question answer comment can only be updated by the owner or admin",
      });
    }

    const updatedComment = await dbUtils.exec("usp_UpdateComment", {
      id: commentId,
      body,
    });

    return res.status(200).json(updatedComment.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Delete answer comment
 * @route   DELETE /api/questions/:questionId/answers/:answerId/comments/:commentId
 * @access  Private (only comment owner or admin)
 */
export const deleteAnswerComment = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { questionId, answerId, commentId } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", {
      id: questionId,
    });
    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    const answer = await dbUtils.exec("usp_GetQuestionAnswerById", {
      questionId,
      answerId,
    });
    if (answer.recordset.length === 0) {
      return res.status(404).json({
        message: `Answer id ${answerId} does not exist on question id ${questionId}`,
      });
    }

    const comment = await dbUtils.exec("usp_GetQuestionAnswerCommentById", {
      answerId,
      commentId,
    });
    if (comment.recordset.length === 0) {
      return res.status(404).json({
        message: `Comment id ${commentId} does not exist on answer id ${answerId}`,
      });
    }

    const commentUserOwner = await dbUtils.exec("usp_FindUserById", {
      id: user.id,
    });
    const owner = commentUserOwner.recordset[0];
    if (comment.recordset[0].userId !== user.id && !owner.isAdmin) {
      return res.status(403).json({
        message: "Answer comment can only be deleted by the owner or admin",
      });
    }

    await dbUtils.exec("usp_DeleteComment", {
      id: commentId,
    });

    return res.status(200).json({ message: "Comment deleted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
