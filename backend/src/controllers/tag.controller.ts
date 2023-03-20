import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { DatabaseUtils } from "../utils/db.util";
import { Request, Response } from "express";
import { TagCreateDto, TagUpdateDto } from "../dtos/tag.dto";
import { IPagination } from "../interfaces/pagination.interface";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import { IUser } from "../interfaces/user.interface";
import { CreateLog } from "../utils/logger.util";

const dbUtils = new DatabaseUtils();

/*
 * @desc    Get all tags
 * @route   GET /api/tags
 * @access  Public
 */
export const getAllTags = async (req: Request, res: Response) => {
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const tags = await dbUtils.exec("usp_GetAllTags", {
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    return res.status(200).json(tags.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Get tag by id
 * @route   GET /api/tags/:id
 * @access  Public
 */
export const getTagById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tag = await dbUtils.exec("usp_GetTagById", { id });

    if (tag.recordset.length === 0) {
      return res.status(404).json({ message: "Tag does not exist" });
    }

    return res.status(200).json(tag.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Get tag by name
 * @route   GET /api/tags/:tagName
 * @access  Public
 */
export const getTagByName = async (req: Request, res: Response) => {
  const { tagName } = req.params;

  CreateLog.debug(tagName);
  try {
    const tag = await dbUtils.exec("usp_GetTagByName", { name: tagName });

    if (tag.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "Tag with that name does not exist" });
    }

    return res.status(200).json(tag.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Search tags by name
 * @route   GET /api/tags/search?tagName=name
 * @access  Public
 */

export const searchTagsByName = async (req: Request, res: Response) => {
  const { tagName } = req.query;

  try {
    const tags = await dbUtils.exec("usp_SearchTagsByName", { tagName });

    return res.status(200).json(tags.recordset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Create a new tag
 * @route   POST /api/tags
 * @access  Private (only authenticated user)
 */
export const createTag = async (req: IRequestWithUser, res: Response) => {
  const { error } = TagCreateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { name, body } = req.body;

  try {
    const tag = await dbUtils.exec("usp_GetTagByName", { name });

    if (tag.recordset.length > 0) {
      return res.status(400).json({ message: "Tag already exists" });
    }

    const newTag = await dbUtils.exec("usp_CreateTag", {
      userId: req.user?.id,
      name,
      body,
    });

    return res.status(201).json(newTag.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Update a tag
 * @route   PUT /api/tags/:id
 * @access  Private (only owner or admin can update a tag)
 */
export const updateTag = async (req: IRequestWithUser, res: Response) => {
  const { error } = TagUpdateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { id } = req.params;
  const { name, body } = req.body;

  const user = req.user as IUser;

  try {
    const tag = await dbUtils.exec("usp_GetTagById", { id });

    if (tag.recordset.length === 0) {
      return res.status(404).json({ message: "Tag does not exist" });
    }

    if (tag.recordset[0].userId !== user.id && !user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized, only tag owner or admin can update a tag",
      });
    }

    const updatedTag = await dbUtils.exec("usp_UpdateTag", { id, name, body });

    return res.status(200).json(updatedTag.recordset[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};

/*
 * @desc    Delete a tag
 * @route   DELETE /api/tags/:tagId
 * @access  Private (only admin can delete a tag)
 */
export const deleteTag = async (req: IRequestWithUser, res: Response) => {
  const { tagId } = req.params;

  const user = req.user as IUser;

  try {
    const tag = await dbUtils.exec("usp_GetTagById", { id: tagId });

    if (tag.recordset.length === 0) {
      return res.status(404).json({ message: "Tag does not exist" });
    }

    if (tag.recordset[0].userId !== user.id && !user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized, only tag owner or admin can delete a tag",
      });
    }

    // Delete the question-tag/s relation
    await dbUtils.exec("usp_DeleteQuestionTags", { tagId });

    await dbUtils.exec("usp_HardDeleteTag", { id: tagId });

    return res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    CreateLog.error(error);
  }
};
