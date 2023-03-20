import express from "express";
import {
  getAllTags,
  searchTagsByName,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller";

import { authenticateUser } from "../middlewares/auth.middleware";

const tagRoutes = express.Router();

tagRoutes.route("/").get(getAllTags);

tagRoutes.route("/search").get(searchTagsByName);

// tagRoutes.route("/:tagName").get(getTagByName); // NOTE: to avoid conflict with /:id route for now

tagRoutes.route("/:id").get(getTagById);

tagRoutes.route("/").post(authenticateUser, createTag);

tagRoutes.route("/:id").put(authenticateUser, updateTag);

tagRoutes.route("/:tagId").delete(authenticateUser, deleteTag);

export default tagRoutes;
