import express from "express";
import {
  getQuestionAnswers,
  createQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer,
  getQuestionAnswerById,
  downvoteAnswer,
  upvoteAnswer,
} from "../controllers/answer.controller";
import {
  getAnswerComments,
  getAnswerCommentById,
  createAnswerComment,
  updateAnswerComment,
  deleteAnswerComment,
  getQuestionComments,
  getQuestionCommentById,
  createQuestionComment,
  updateQuestionComment,
  deleteQuestionComment,
} from "../controllers/comment.controller";
import {
  createQuestion,
  downvoteQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsByUserId,
  getSoftDeletedQuestions,
  hardDeleteQuestion,
  restoreQuestion,
  searchQuestions,
  softDeleteQuestion,
  updateQuestion,
  upvoteQuestion,
} from "../controllers/question.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware";

const questionRoutes = express.Router();

// questionRoutes.route("/").get(getAllQuestionsWithTags);
questionRoutes.route("/").get(getAllQuestions);

questionRoutes.route("/search").get(searchQuestions);

questionRoutes.route("/user/:userId").get(getQuestionsByUserId);

questionRoutes
  .route("/soft-deleted")
  .get(authenticateUser, authorizeAdmin, getSoftDeletedQuestions);

questionRoutes.route("/:id").get(getQuestionById);

questionRoutes.route("/:id/comments").get(getQuestionComments);

questionRoutes.route("/:id/comments/:commentId").get(getQuestionCommentById);

questionRoutes
  .route("/:questionId/comments")
  .post(authenticateUser, createQuestionComment);

questionRoutes
  .route("/:questionId/comments/:commentId")
  .put(authenticateUser, updateQuestionComment);

questionRoutes
  .route("/:questionId/comments/:commentId")
  .delete(authenticateUser, deleteQuestionComment);

questionRoutes.route("/:id/answers").get(getQuestionAnswers);

questionRoutes.route("/ask").post(authenticateUser, createQuestion);

questionRoutes.route("/:id").put(authenticateUser, updateQuestion);

questionRoutes.route("/:id").delete(authenticateUser, softDeleteQuestion);

questionRoutes
  .route("/:id/hard-delete")
  .delete(authenticateUser, hardDeleteQuestion);

questionRoutes.route("/:id/restore").patch(authenticateUser, restoreQuestion);

questionRoutes.route("/:id/upvote").patch(authenticateUser, upvoteQuestion);

questionRoutes.route("/:id/downvote").patch(authenticateUser, downvoteQuestion);

/* 
#################################################################################
#                                                                               #
#                               Answer Routes                                   #
#                                                                               #
#################################################################################
 */

questionRoutes.route("/:id/answers").get(getQuestionAnswers);

questionRoutes
  .route("/:questionId/answers/:answerId")
  .get(getQuestionAnswerById);

questionRoutes
  .route("/:questionId/answers")
  .post(authenticateUser, createQuestionAnswer);

questionRoutes
  .route("/:questionId/answers/:answerId/comments")
  .get(getAnswerComments);

questionRoutes
  .route("/:questionId/answers/:answerId/comments/:commentId")
  .get(getAnswerCommentById);

questionRoutes
  .route("/:questionId/answers/:answerId")
  .put(authenticateUser, updateQuestionAnswer);

questionRoutes
  .route("/:questionId/answers/:answerId")
  .delete(authenticateUser, deleteQuestionAnswer);

questionRoutes
  .route("/:questionId/answers/:answerId/comments")
  .post(authenticateUser, createAnswerComment);

questionRoutes
  .route("/:id/answers/:answerId/upvote")
  .patch(authenticateUser, upvoteAnswer);

questionRoutes
  .route("/:id/answers/:answerId/downvote")
  .patch(authenticateUser, downvoteAnswer);

questionRoutes
  .route("/:questionId/answers/:answerId/comments/:commentId")
  .put(authenticateUser, updateAnswerComment);

questionRoutes
  .route("/:questionId/answers/:answerId/comments/:commentId")
  .delete(authenticateUser, deleteAnswerComment);

export default questionRoutes;
