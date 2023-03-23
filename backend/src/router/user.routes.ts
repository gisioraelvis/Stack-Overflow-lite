import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserByAdmin,
  forgotPassword,
  resetPassword,
  getAllSoftDeletedUsers,
  getUserSiteAnalytics,
} from "../controllers/user.controller";
import {
  authenticateUser,
  authorizeAdmin,
  verifyPasswordResetToken,
} from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

// userRoutes.route("/").get(authenticateUser, authorizeAdmin, getAllUsers);
userRoutes.route("/").get(getAllUsers);


userRoutes
  .route("/soft-deleted")
  .get(authenticateUser, authorizeAdmin, getAllSoftDeletedUsers);

userRoutes.route("/signup").post(registerUser);

userRoutes.post("/signin", loginUser);

userRoutes.post("/forgot-password", forgotPassword);

userRoutes
  .route("/reset-password")
  .put(verifyPasswordResetToken, resetPassword);

userRoutes.route("/profile").get(authenticateUser, getUserProfile);

userRoutes.route("/profile").put(authenticateUser, updateUserProfile);

userRoutes.route("/:id/analytics").get(authenticateUser, getUserSiteAnalytics);

userRoutes.route("/:id").get(authenticateUser, authorizeAdmin, getUserById);

userRoutes.route("/:id").delete(authenticateUser, authorizeAdmin, deleteUser);

userRoutes
  .route("/:id")
  .put(authenticateUser, authorizeAdmin, updateUserByAdmin);

export default userRoutes;
