import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Request, Response } from "express";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";

const dbUtils = new DatabaseUtils();

/*
 * @desc    Get site analytics
 * @route   GET /api/admin/analytics
 * @access  Private (only an admin can get site analytics)
 */
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await dbUtils.exec("usp_GetSiteAnalytics");

    return res.status(200).json(analytics.recordset[0]);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
