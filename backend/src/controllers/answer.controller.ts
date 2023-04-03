import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IAnswer, IAnswerObject } from "../interfaces/answer.interface";
import { AnswerCreateDto, AnswerUpdateDto } from "../dtos/answer.dto";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Get a question answers
 * @route   GET /api/questions/:id/answers
 * @access  Public
 */
export const getQuestionAnswers = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const answers = await dbUtils.exec("usp_GetQuestionAnswers", { id });

    if (answers.recordset.length === 0) {
      return res.status(200).json([]);
    }

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
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Get answer by id
 * @route   GET /api/questions/:questionId/answers/:answerId
 * @access  Public
 */
export const getQuestionAnswerById = async (req: Request, res: Response) => {
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

    return res.status(200).json(answer.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Create answer
 * @route   POST /api/questions/:questionId/answers
 * @access  Private
 */
export const createQuestionAnswer = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = AnswerCreateDto.validate(req.body);
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

    const answer = await dbUtils.exec("usp_CreateQuestionAnswer", {
      questionId,
      userId: user.id,
      body,
    });

    return res.status(201).json(answer.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Update answer
 * @route   PUT /api/questions/:questionId/answers/:answerId
 * @access  Private (only answer owner or admin)
 */
export const updateQuestionAnswer = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = AnswerUpdateDto.validate(req.body);
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

    const answerUserOwner = await dbUtils.exec("usp_FindUserById", {
      id: user.id,
    });
    const owner = answerUserOwner.recordset[0];
    if (answer.recordset[0].userId !== user.id && !owner.isAdmin) {
      return res.status(403).json({
        message: "Question answer can only be updated by the owner or admin",
      });
    }

    const updatedAnswer = await dbUtils.exec("usp_UpdateQuestionAnswer", {
      id: answerId,
      body,
    });

    return res.status(200).json(updatedAnswer.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Upvote answer
 * @route   PATCH /api/questions/:questionId/answers/:answerId/upvote
 * @access  Private
 */
export const upvoteAnswer = async (req: IRequestWithUser, res: Response) => {
  const { answerId } = req.params;

  const user = req.user as IUser;

  try {
    const answer = await dbUtils.exec("usp_GetAnswerById", { id: answerId });

    if (answer.recordset.length === 0) {
      return res.status(404).json({ message: "Answer does not exist" });
    }

    // check if the user upvoted the answer already
    const answerUpvote = await dbUtils.exec("usp_GetUserAnswerVoteRecord", {
      userId: user.id,
      answerId,
      voteType: "upvote",
    });
    if (answerUpvote.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "You already upvoted this answer" });
    }

    // check if the user downvoted the answer before
    const answerDownvote = await dbUtils.exec("usp_GetUserAnswerVoteRecord", {
      userId: user.id,
      answerId,
      voteType: "downvote",
    });
    if (answerDownvote.recordset.length > 0) {
      // decrement the downvote count on the answer
      await dbUtils.exec("usp_DecrementAnswerDownVote", { answerId });

      // remove the user downvote record from the Votes table
      await dbUtils.exec("usp_DeleteUserAnswerVoteRecord", {
        answerId,
        userId: user.id,
        voteType: "downvote",
      });
    }

    // upvote the answer
    await dbUtils.exec("usp_IncrementAnswerUpVote", { answerId });

    // if the user who asked the question upvotes the answer, mark answer accepted
    const question = await dbUtils.exec("usp_GetQuestionByAnswerId", {
      answerId,
    });
    if (question.recordset[0].userId === user.id) {
      await dbUtils.exec("usp_MarkAnswerAccepted", { answerId, isAccepted: 1 });
    }

    // mark the answer as upvoted by the user
    await dbUtils.exec("usp_RecordUserAnswerVote", {
      answerId,
      userId: user.id,
      voteType: "upvote",
    });

    return res.status(200).json({ message: "Answer upvoted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Downvote answer
 * @route   PATCH /api/questions/:questionId/answers/:answerId/downvote
 * @access  Private
 */
export const downvoteAnswer = async (req: IRequestWithUser, res: Response) => {
  const { answerId } = req.params;

  const user = req.user as IUser;

  try {
    const answer = await dbUtils.exec("usp_GetAnswerById", { id: answerId });

    if (answer.recordset.length === 0) {
      return res.status(404).json({ message: "Answer does not exist" });
    }

    // check if the user downvoted the answer already
    const answerDownvote = await dbUtils.exec("usp_GetUserAnswerVoteRecord", {
      userId: user.id,
      answerId,
      voteType: "downvote",
    });
    if (answerDownvote.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "You already downvoted this answer" });
    }

    // check if the user upvoted the answer before
    const answerUpvote = await dbUtils.exec("usp_GetUserAnswerVoteRecord", {
      userId: user.id,
      answerId,
      voteType: "upvote",
    });
    if (answerUpvote.recordset.length > 0) {
      // decrement the upvote count on the answer
      await dbUtils.exec("usp_DecrementAnswerUpVote", { answerId });

      // remove the user upvote record from the Votes table
      await dbUtils.exec("usp_DeleteUserAnswerVoteRecord", {
        answerId,
        userId: user.id,
        voteType: "upvote",
      });
    }

    // downvote the answer
    await dbUtils.exec("usp_IncrementAnswerDownVote", { answerId });

    // if the user who asked the question downvotes the answer,mark answer not accepted
    const question = await dbUtils.exec("usp_GetQuestionByAnswerId", {
      answerId,
    });
    if (question.recordset[0].userId === user.id) {
      await dbUtils.exec("usp_MarkAnswerAccepted", { answerId, isAccepted: 0 });
    }

    // mark the answer as downvoted by the user
    await dbUtils.exec("usp_RecordUserAnswerVote", {
      answerId,
      userId: user.id,
      voteType: "downvote",
    });

    return res.status(200).json({ message: "Answer downvoted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Delete answer
 * @route   DELETE /api/questions/:questionId/answers/:answerId
 * @access  Private (only answer owner or admin)
 */
export const deleteQuestionAnswer = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { questionId, answerId } = req.params;

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

    const answerUserOwner = await dbUtils.exec("usp_FindUserById", {
      id: user.id,
    });
    const owner = answerUserOwner.recordset[0];
    if (answer.recordset[0].userId !== user.id && !owner.isAdmin) {
      return res.status(403).json({
        message: "Question answer can only be deleted by the owner or admin",
      });
    }

    await dbUtils.exec("usp_HardDeleteQuestionAnswer", {
      id: answerId,
    });

    return res.status(200).json({ message: "Answer deleted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
