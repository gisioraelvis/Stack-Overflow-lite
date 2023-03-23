import express from "express";
import { getAnalytics } from "../controllers/admin.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middleware";

const adminRoutes = express.Router();

/* adminRoutes
  .route("/analytics")
  .get(authenticateUser, authorizeAdmin, getAnalytics); */
adminRoutes.route("/analytics").get(getAnalytics);

export default adminRoutes;
