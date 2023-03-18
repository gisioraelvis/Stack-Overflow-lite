import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionAnswers,
  getQuestionById,
  getQuestionComments,
  getSoftDeletedQuestions,
  hardDeleteQuestion,
  restoreQuestion,
  softDeleteQuestion,
  updateQuestion,
  // getQuestionById,
} from "../controllers/question.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware";

const questionRoutes = express.Router();

questionRoutes.route("/").get(getAllQuestions);

questionRoutes
  .route("/soft-deleted")
  .get(authenticateUser, authorizeAdmin, getSoftDeletedQuestions);

questionRoutes.route("/:id").get(getQuestionById);

questionRoutes.route("/:id/comments").get(getQuestionComments);

questionRoutes.route("/:id/answers").get(getQuestionAnswers);

questionRoutes.route("/ask").post(authenticateUser, createQuestion);

questionRoutes.route("/:id").put(authenticateUser, updateQuestion);

questionRoutes.route("/:id").delete(authenticateUser, softDeleteQuestion);

questionRoutes
  .route("/:id/hard-delete")
  .delete(authenticateUser, hardDeleteQuestion);

questionRoutes.route("/:id/restore").patch(authenticateUser, restoreQuestion);

export default questionRoutes;
