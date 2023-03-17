import express from "express";
import { getAllQuestions } from "../controllers/question.controller";

const questionRoutes = express.Router();

questionRoutes.route("/").get(getAllQuestions);

export default questionRoutes;
