import Joi, { ref } from "joi";

// signup dto
export const UserSignUpDto = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required(),
  // TODO: uncomment in production
  // .pattern(
  //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
  // )
  // .messages({
  //   "string.pattern.base":
  //     "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
  // }),

  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// signin dto
export const UserSignInDto = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please provide a password",
  }),
});

// forgot password dto
export const UserForgotPasswordDto = Joi.object({
  email: Joi.string().required().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
});

// reset password dto
export const UserPasswordResetDto = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

// update user profile dto name, email, password, avatar, bio
export const UserUpdateProfileDto = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().messages({
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).messages({
    "any.only": "Passwords do not match",
  }),
  avatar: Joi.string(),
  bio: Joi.string(),
});

// update user password dto
export const UserUpdatePasswordDto = Joi.object({
  password: Joi.string()
    .required()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    )
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character",
    }),
  confirmPassword: Joi.equal(ref("password")).required().messages({
    "any.only": "Passwords do not match",
  }),
});

export const UserUpdateProfileByAdminDto = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().messages({
    "string.empty": "Please provide an email",
    "string.email": "Invalid email",
  }),
  avatar: Joi.string(),
  bio: Joi.string(),
  isDeleted: Joi.boolean(),
  isAdmin: Joi.boolean(),
});
