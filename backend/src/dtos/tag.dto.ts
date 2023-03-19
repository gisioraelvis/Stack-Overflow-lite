import Joi from "joi";

export const TagCreateDto = Joi.object({
  name: Joi.string().required(),
  body: Joi.string().required(),
});

export const TagUpdateDto = Joi.object({
  name: Joi.string(),
  body: Joi.string(),
  isDeleted: Joi.boolean(),
});
