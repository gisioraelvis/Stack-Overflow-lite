import express from "express";
import { getAnswerComments } from "../controllers/answer.controller";

const answerRoutes = express.Router();

answerRoutes.route("/:id/comments").get(getAnswerComments);

export default answerRoutes;
