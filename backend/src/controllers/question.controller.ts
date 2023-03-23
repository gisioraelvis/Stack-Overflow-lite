import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IPagination } from "../interfaces/pagination.interface";
import { IQuestion } from "../interfaces/question.interface";
import { QuestionCreateDto, QuestionUpdateDto } from "../dtos/question.dto";
import { formatQuestionTags } from "../utils/question.utils";

const dbUtils = new DatabaseUtils();
/**
 * @desc    Get all questions
 * @route   GET /api/questions?page=1&itemsPerPage=10
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
    const questions = await dbUtils.exec("usp_GetAllQuestions", {
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    let formatedQuestionWithTags = [] as IQuestion[];

    for (const question of questions.recordset) {
      await dbUtils
        .exec("usp_GetQuestionById", {
          id: question.id,
        })
        .then((q) => {
          console.log(q.recordset);
          const formattedQuestion = formatQuestionTags(q.recordset);
          formatedQuestionWithTags.push(formattedQuestion[0]);
        });
    }

    return res.status(200).json(formatedQuestionWithTags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/**
 * @desc    Search questions
 * @route   GET /api/questions/search?searchTerm=javascript
 * @access  Public
 */
export const searchQuestions = async (req: Request, res: Response) => {
  // optional pagination query params, page, itemsPerPage
  const { searchTerm, page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const questions = await dbUtils.exec("usp_SearchQuestions", {
      searchTerm: searchTerm,
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    let formatedQuestionWithTags = [] as IQuestion[];

    for (const question of questions.recordset) {
      await dbUtils
        .exec("usp_GetQuestionById", {
          id: question.id,
        })
        .then((q) => {
          const formattedQuestion = formatQuestionTags(q.recordset);
          formatedQuestionWithTags.push(formattedQuestion[0]);
        });
    }

    return res.status(200).json(formatedQuestionWithTags);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/**
 * @desc    Get all questions
 * @route   GET /api/questions
 * @access  Public
 */
/* export const getAllQuestionsWithTags = async (req: Request, res: Response) => {
  // optional pagination query params, page, itemsPerPage
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const questions = await dbUtils.exec("usp_GetAllQuestionsWithTags");

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
            if (q.tagName === null || undefined) return [] as ITag[];
            return {
              id: q.tagId,
              userId: q.tagUserId,
              name: q.tagName,
              body: q.tagBody,
              createdAt: q.tagCreatedAt,
              updatedAt: q.tagUpdatedAt,
            };
          })
          .flat()
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
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
}; */

/**
 * @desc    Get a question by id
 * @route   GET /api/questions/:id
 * @access  Public
 */
export const getQuestionById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const questions = await dbUtils.exec("usp_GetQuestionById", { id });

    if (questions.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    return res.status(200).json(formatQuestionTags(questions.recordset)[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
    // first check if the tag exist
    for (const tag of tags) {
      const tagExists = await dbUtils.exec("usp_GetTagByName", {
        name: tag.name,
      });

      if (tagExists.recordset.length === 0) {
        // tag doesn't exist, create it
        const createdTag = await dbUtils.exec("usp_CreateTag", {
          userId: user.id,
          name: tag.name,
          body: tag.body,
        });

        tagIds.push(createdTag.recordset[0].id);
      } else {
        //tag exists already
        tagIds.push(tagExists.recordset[0].id);
      }
    }

    const question = await dbUtils.exec("usp_CreateQuestion", {
      title,
      body,
      userId: user.id,
    });

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

    return res.status(200).json(formatQuestionTags(questions.recordset)[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Update a question
 * @route   PUT /api/questions/:id
 * @access  Private (only the question owner or an admin can update it)
 */
export const updateQuestion = async (req: IRequestWithUser, res: Response) => {
  const { error } = QuestionUpdateDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { id } = req.params;
  const { title, body, tags } = req.body;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });

    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    if (question.recordset[0].userId !== user.id && !user.isAdmin) {
      return res.status(401).json({
        message:
          "Unauthorized, only question owner or admin can update a question",
      });
    }

    const tagIds: number[] = [];
    // check if the tags are being updated
    if (tags && tags.length > 0) {
      for (const tag of tags) {
        const tagExists = await dbUtils.exec("usp_GetTagByName", {
          name: tag.name,
        });

        if (tagExists.recordset.length === 0) {
          //tag doesn't exist, create it
          const createdTag = await dbUtils.exec("usp_CreateTag", {
            userId: user.id,
            name: tag.name,
            body: tag.body,
          });

          tagIds.push(createdTag.recordset[0].id);
        } else {
          // tag exists already
          tagIds.push(tagExists.recordset[0].id);
        }
      }

      // delete the QuestionTags relation
      await dbUtils.exec("usp_DeleteQuestionTags", {
        questionId: id,
      });

      // recreate the QuestionTags relation
      for (const tagId of tagIds) {
        await dbUtils.exec("usp_CreateQuestionTag", {
          questionId: id,
          tagId,
        });
      }
    }

    //update the question
    await dbUtils.exec("usp_UpdateQuestion", {
      id,
      title,
      body,
    });

    const questions = await dbUtils.exec("usp_GetQuestionById", { id });

    return res.status(200).json(formatQuestionTags(questions.recordset)[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Upvote a question
 * @route   PATCH /api/questions/:id/upvote
 * @access  Private
 */
export const upvoteQuestion = async (req: IRequestWithUser, res: Response) => {
  const { id } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });

    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    // check if the user upvoted the question already
    const questionUpvote = await dbUtils.exec("usp_GetUserQuestionVoteRecord", {
      userId: user.id,
      questionId: id,
      voteType: "upvote",
    });
    if (questionUpvote.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "You already upvoted this question" });
    }

    // check if the user downvoted the question before
    const questionDownvote = await dbUtils.exec(
      "usp_GetUserQuestionVoteRecord",
      {
        userId: user.id,
        questionId: id,
        voteType: "downvote",
      }
    );
    if (questionDownvote.recordset.length > 0) {
      // decrement the downvote count on the question
      await dbUtils.exec("usp_DecrementQuestionDownVote", { questionId: id });

      // remove the user downvote record from the Votes table
      await dbUtils.exec("usp_DeleteUserQuestionVoteRecord", {
        questionId: id,
        userId: user.id,
        voteType: "downvote",
      });
    }

    // upvote the question
    await dbUtils.exec("usp_IncrementQuestionUpVote", { questionId: id });

    // mark the question as upvoted by the user
    await dbUtils.exec("usp_RecordUserQuestionVote", {
      questionId: id,
      userId: user.id,
      voteType: "upvote",
    });

    return res.status(200).json({ message: "Question upvoted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Downvote a question
 * @route   PATCH /api/questions/:id/downvote
 * @access  Private
 */
export const downvoteQuestion = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { id } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });

    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    // check if the user upvoted the question already
    const questionUpvote = await dbUtils.exec("usp_GetUserQuestionVoteRecord", {
      userId: user.id,
      questionId: id,
      voteType: "downvote",
    });
    if (questionUpvote.recordset.length > 0) {
      return res
        .status(400)
        .json({ message: "You already downvoted this question" });
    }

    // check if the user upvoted the question before
    const questionDownvote = await dbUtils.exec(
      "usp_GetUserQuestionVoteRecord",
      {
        userId: user.id,
        questionId: id,
        voteType: "upvote",
      }
    );
    if (questionDownvote.recordset.length > 0) {
      // decrement the upvote count on the question
      await dbUtils.exec("usp_DecrementQuestionUpVote", { questionId: id });

      // remove the user upvote record from the Votes table
      await dbUtils.exec("usp_DeleteUserQuestionVoteRecord", {
        questionId: id,
        userId: user.id,
        voteType: "upvote",
      });
    }

    // downvote the question
    await dbUtils.exec("usp_IncrementQuestionDownVote", { questionId: id });

    // mark the question as downvoted by the user
    await dbUtils.exec("usp_RecordUserQuestionVote", {
      questionId: id,
      userId: user.id,
      voteType: "downvote",
    });

    return res.status(200).json({ message: "Question downvoted" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    SoftDelete a question
 * @route   DELETE /api/questions/:id
 * @access  Private (only the question owner or an admin can delete it)
 */
export const softDeleteQuestion = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { id } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });

    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    if (question.recordset[0].userId !== user.id && !user.isAdmin) {
      return res.status(401).json({
        message:
          "Unauthorized, only question owner or admin can delete a question",
      });
    }

    await dbUtils.exec("usp_SoftDeleteQuestion", { id });

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Get all soft deleted questions
 * @route   GET /api/questions/soft-deleted?page=1&itemsPerPage=10
 * @access  Private (only an admin can get all soft deleted questions)
 */
export const getSoftDeletedQuestions = async (
  req: IRequestWithUser,
  res: Response
) => {
  // optional pagination query params, page, itemsPerPage
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  const user = req.user as IUser;

  try {
    if (!user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized, only admin can get all soft deleted questions",
      });
    }

    const questions = await dbUtils.exec("usp_GetSoftDeletedQuestions", {
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    return res.status(200).json(questions.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Restore a soft deleted question
 * @route   PATCH /api/questions/:id/restore
 * @access  Private (only an admin can restore a soft deleted question)
 */
export const restoreQuestion = async (req: IRequestWithUser, res: Response) => {
  const { id } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetSoftDeletedQuestionById", {
      id,
    });

    if (question.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: `Soft deleted question with ${id} does not exist` });
    }

    if (!user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized, only admin can restore a soft deleted question",
      });
    }

    await dbUtils.exec("usp_RestoreQuestion", { id });

    return res.status(200).json({ message: "Question restored successfully" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    HardDelete a question
 * @route   DELETE /api/questions/:id/hard-delete
 * @access  Private (only an admin can hard delete a question)
 */
export const hardDeleteQuestion = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { id } = req.params;

  const user = req.user as IUser;

  try {
    const question = await dbUtils.exec("usp_GetQuestionById", { id });

    if (question.recordset.length === 0) {
      return res.status(404).json({ message: "Question does not exist" });
    }

    if (!user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized, only admin can hard delete a question",
      });
    }

    await dbUtils.exec("usp_HardDeleteQuestion", { id });

    return res.status(200).json({ message: "Question deleted successfully" });
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
