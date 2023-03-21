import Bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  UserForgotPasswordDto,
  UserPasswordResetDto,
  UserSignInDto,
  UserSignUpDto,
  UserUpdateProfileByAdminDto,
  UserUpdateProfileDto,
} from "../dtos/user.dto";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { IJWTPayload } from "../interfaces/jwt-payload.interface";
import { generateJWT } from "../utils/generate-jwt.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import dotenv from "dotenv";
import { sendEmail } from "../utils/email.util";
import { IPagination } from "../interfaces/pagination.interface";
dotenv.config({ path: __dirname + "/../../.env" });

const dbUtils = new DatabaseUtils();

/**
 * @desc    Auth user & generate JWT token
 * @route   POST /api/users/signin
 * @access  Public
 */
export const loginUser = async (req: Request, res: Response) => {
  const { error } = UserSignInDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { email, password } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", { email });

    if (user.recordset.length === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Check if user is soft deleted
    if (user.recordset[0].isDeleted) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await Bcrypt.compare(password, user.recordset[0].password);

    if (isMatch) {
      const { id, name, email, isAdmin } = user.recordset[0];

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      // remove password from user.recordset[0]
      delete user.recordset[0].password;

      return res.status(200).json({ ...user.recordset[0], JWT });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/signup
 * @access  Public
 */
export const registerUser = async (req: Request, res: Response) => {
  const { error } = UserSignUpDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { name, email, password } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", { email });

    // check if user was soft deleted
    if (user.recordset.length > 0 && user.recordset[0].isDeleted) {
      return res.status(400).json({
        message:
          "Email has been registered before, please try another email or contact support",
      });
    }

    if (user.recordset.length > 0) {
      return res.status(400).json({
        message:
          "User with similar email already exists, please try another email",
      });
    }

    const passwordHash = await Bcrypt.hash(password, 10);

    const newUser = await dbUtils.exec("usp_RegisterUser", {
      name,
      email,
      password: passwordHash,
    });

    if (newUser.recordset.length > 0) {
      const { id, name, email, isAdmin } = newUser.recordset[0];

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      // remove password from newUser.recordset[0]
      delete newUser.recordset[0].password;

      return res.status(201).json({ ...newUser.recordset[0], JWT });
    } else {
      return res.status(400).json({ message: "User registration failed" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Forgot password
 * @route   POST /api/users/forgot-password
 * @access  Public
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { error } = UserForgotPasswordDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const userEmail = req.body.email;

  try {
    const user = await dbUtils.exec("usp_FindUserByEmail", {
      email: userEmail,
    });

    if (user.recordset.length === 0) {
      return res
        .status(404)
        .json({ message: "User with provided email does not exist" });
    }

    const { id, name, email, isAdmin } = user.recordset[0];

    const JWT = generateJWT({ id, name, email, isAdmin } as IJWTPayload, "1h");

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/?resetToken=${JWT}`;

    const passwordResetMsg = `
    <h2>You requested a password reset</h2> 
    <p>Please click on the link below to reset your password</p> 
    <a href=${resetUrl} clicktracking=off>Reset Password</a>
    <p>If the link does not work, copy and paste the link below into your browser</p>
    <p>${resetUrl}</p>
    <p>If you did not request this, please ignore this email</p>
    `;

    try {
      await sendEmail("Password Reset Request", email, passwordResetMsg);

      return res.status(200).json({
        message: "We have sent a link to reset your password to your email",
        resetUrl,
      });
    } catch (error: any) {
      CreateLog.error(error);
      return res.status(500).json({ message: "Email could not be sent" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Reset password
 * @route   POST /api/users/reset-password
 * @access  Public
 */
export const resetPassword = async (req: IRequestWithUser, res: Response) => {
  const { error } = UserPasswordResetDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const password = req.body.password as string;

  try {
    const { id, name, email, isAdmin } = req.user as IUser;

    const passwordHash = await Bcrypt.hash(password, 10);

    const updatedUser = await dbUtils.exec("usp_UpdateUser", {
      id,
      name,
      email,
      password: passwordHash,
      isAdmin,
    });

    if (updatedUser.recordset.length > 0) {
      const { id, name, email, isAdmin } = updatedUser.recordset[0];

      //password reset was successful email
      const subject = "Password Reset Successful";
      const html = `<h1>Password Reset Successful</h1>
      <p>Dear ${name},</p>
      <p>Your password has been reset successfully.</p>
      <P>Happy to have you contributing on&nbsp;
         <a href=${process.env.CLIENT_URL}>Stack Overflow Lite</a> 🎉
      </P>
      <p>If you did not request this, please contact us immediately.</p>
      <p>Regards,<br/>Stack Overflow Lite Team</p>`;

      sendEmail(subject, email, html);

      const JWT = generateJWT(
        {
          id,
          name,
          email,
          isAdmin,
        } as IJWTPayload,
        "1d"
      );

      // remove password from updatedUser.recordset[0]
      delete updatedUser.recordset[0].password;

      return res.status(200).json({ ...updatedUser.recordset[0], JWT });
    } else {
      return res.status(400).json({
        message: "Password reset failed, please request a new password reset",
      });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req: IRequestWithUser, res: Response) => {
  const userId = req.user?.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      delete user.recordset[0].password;
      return res.status(200).json(user.recordset[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (
  req: IRequestWithUser,
  res: Response
) => {
  const { error } = UserUpdateProfileDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const userId = req.user?.id as string;
  const { name, email, password, avatar, bio } = req.body;

  try {
    // If user tries to update email that already exists in the database
    // i.e another user exists with the same email that's not the current user
    const otherUser = await dbUtils.exec("usp_FindUserByEmail", { email });

    // check if otherUser is not the current user
    if (otherUser.recordset.length > 0) {
      if (otherUser.recordset[0].id !== userId) {
        return res.status(400).json({
          message:
            "Another user with a similar email already exists, please try another email",
        });
      }
    }

    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      let passwordHash = user.recordset[0].password;
      if (password) {
        passwordHash = await Bcrypt.hash(password, 10);
      }

      const updatedUser = await dbUtils.exec("usp_UpdateUser", {
        id: userId,
        name,
        email,
        password: passwordHash,
        avatar,
        bio,
      });

      if (updatedUser.recordset.length > 0) {
        delete updatedUser.recordset[0].password;
        return res.status(200).json(updatedUser.recordset[0]);
      } else {
        return res.status(400).json({ message: "User profile update failed" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/*
 * @desc    Get user site analytics
 * @route   GET /api/users/:id/analytics
 * @access  Private - User and Admin
 */
export const getUserSiteAnalytics = async (
  req: IRequestWithUser,
  res: Response
) => {
  const userId = req.params.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: +userId });

    if (user.recordset.length > 0) {
      const userSiteAnalytics = await dbUtils.exec("usp_GetUserSiteAnalytics", {
        userId,
      });

      return res.status(200).json(userSiteAnalytics.recordset[0]);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private - Admin only
 */
export const getAllUsers = async (req: Request, res: Response) => {
  // optional pagination query params
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const users = await dbUtils.exec("usp_GetAllUsers", {
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get all soft deleted users
 * @route   GET /api/users/soft-deleted
 * @access  Private - Admin only
 */
export const getAllSoftDeletedUsers = async (req: Request, res: Response) => {
  // optional pagination query params
  const { page, itemsPerPage } = req.query;

  const pagination: IPagination = {
    page: page ? +page : 1,
    itemsPerPage: itemsPerPage ? +itemsPerPage : 10,
  };

  try {
    const users = await dbUtils.exec("usp_GetAllSoftDeletedUsers", {
      page: pagination.page,
      itemsPerPage: pagination.itemsPerPage,
    });

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private - Admin only
 */
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      delete user.recordset[0].password;
      return res.status(200).json(user.recordset[0]);
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private - Admin only
 */
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      const deletedUser = await dbUtils.exec("usp_DeleteUser", { id: userId });

      if (deletedUser.rowsAffected[0] > 0) {
        return res.status(200).json({ message: "User deleted" });
      } else {
        return res.status(400).json({ message: "User delete failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update user profile by admin
 * i.e all fields including upgrading to admin except password
 * @route   PUT /api/users/:id
 * @access  Private - Admin only
 */
export const updateUserByAdmin = async (
  req: IRequestWithUser,
  res: Response
) => {
  const userId = req.params.id as string;

  const { error } = UserUpdateProfileByAdminDto.validate(req.body);

  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const { name, email, avatar, bio, isDeleted, isAdmin } = req.body;

  try {
    const user = await dbUtils.exec("usp_FindUserById", { id: userId });

    if (user.recordset.length > 0) {
      // check if the email is already taken by another user that's not the current user
      const emailExists = await dbUtils.exec("usp_FindUserByEmail", { email });
      if (
        emailExists.recordset.length > 0 &&
        emailExists.recordset[0].id !== +userId
      ) {
        return res.status(400).json({ message: "Email already taken" });
      }

      // email field is unique, so if user doesn't change the email/mantains same email,
      // the update it will throw an error(Violation of UNIQUE KEY constraint)
      // So we need to check if the email is the same as the one in the db before updating
      // if same email exclude it from the update else update everything
      if (email === user.recordset[0].email) {
        const updatedUser = await dbUtils.exec("usp_UpdateUser", {
          id: userId,
          name,
          avatar,
          bio,
          isDeleted,
          isAdmin,
        });

        if (updatedUser.rowsAffected[0] > 0) {
          delete updatedUser.recordset[0].password;
          return res.status(200).json({
            message: "User profile updated",
            updatedUser: updatedUser.recordset[0],
          });
        } else {
          return res
            .status(400)
            .json({ message: "User profile update failed" });
        }
      } else {
        const updatedUser = await dbUtils.exec("usp_UpdateUser", {
          id: userId,
          name,
          email,
          avatar,
          bio,
          isDeleted,
          isAdmin,
        });

        if (updatedUser.rowsAffected[0] > 0) {
          delete updatedUser.recordset[0].password;
          return res.status(200).json({
            message: "User profile updated",
            updatedUser: updatedUser.recordset[0],
          });
        } else {
          return res
            .status(400)
            .json({ message: "User profile update failed" });
        }
      }
    } else {
      return res
        .status(404)
        .json({ message: "User with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};
