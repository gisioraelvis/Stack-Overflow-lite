import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionAnswers,
  getQuestionById,
  getQuestionComments,
  // getQuestionById,
} from "../controllers/question.controller";
import { authenticateUser } from "../middlewares/auth.middleware";

const questionRoutes = express.Router();

questionRoutes.route("/").get(getAllQuestions);

questionRoutes.route("/:id").get(getQuestionById);

questionRoutes.route("/:id/comments").get(getQuestionComments);

questionRoutes.route("/:id/answers").get(getQuestionAnswers);

questionRoutes.route("/ask").post(authenticateUser, createQuestion);

export default questionRoutes;
