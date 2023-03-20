import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IUser } from "../interfaces/user.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IPagination } from "../interfaces/pagination.interface";
import { IQuestion, IQuestionObject } from "../interfaces/question.interface";
import { ITag, ITagObject } from "../interfaces/tag.interface";
import { QuestionCreateDto, QuestionUpdateDto } from "../dtos/question.dto";
import { formatQuestionTags } from "../utils/question.utils";

const dbUtils = new DatabaseUtils();

/*
 * @desc    Get all soft deleted questions
 * @route   GET /api/questions/soft-deleted
 * @access  Private (only an admin can get all soft deleted questions)
 */
export const getSoftDeletedQuestions = async (
    req: IRequestWithUser,
    res: Response
  ) => {
    const user = req.user as IUser;
  
    try {
      if (!user.isAdmin) {
        return res.status(401).json({
          message: "Unauthorized, only admin can get all soft deleted questions",
        });
      }
  
      const questions = await dbUtils.exec("usp_GetSoftDeletedQuestions");
  
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