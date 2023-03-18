import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  // getQuestionById,
} from "../controllers/question.controller";

const questionRoutes = express.Router();

questionRoutes.route("/").get(getAllQuestions);

questionRoutes.route("/:id").get(getQuestionById);

export default questionRoutes;
