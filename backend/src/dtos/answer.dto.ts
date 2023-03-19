import Joi from "joi";

export const AnswerCreateDto = Joi.object({
  body: Joi.string().required(),
});

export const AnswerUpdateDto = Joi.object({
  body: Joi.string().required(),
});

export const CommentCreateDto = Joi.object({
  body: Joi.string().required(),
});

export const CommentUpdateDto = Joi.object({
  body: Joi.string().required(),
});
