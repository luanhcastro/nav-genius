import Joi from 'joi';

// Define a schema para validação do usuário
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  coordinates: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }),
});

export const validateUser = (userData) => {
  return userSchema.validate(userData);
};
