import Joi from "joi";

export const QuestionCreateDto = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  tags: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      body: Joi.string().required(),
    })
  ),
});
