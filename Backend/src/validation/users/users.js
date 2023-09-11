import Joi from "joi";

const signUp = Joi.object({
  firstname: Joi.string()
    .min(1)
    .max(255)
    .regex(/^[A-Z, a-z]+$/)
    .required()
    .messages({
      "string.empty": `"firstname" is a required field.`,
      "string.length": `"firstname" must contain at least 1 or maximum 255 characters`,
    }),
  lastname: Joi.string()
    .min(1)
    .max(255)
    .regex(/^[A-Z, a-z]+$/)
    .required()
    .messages({
      "string.empty": `"lastname" is a required field.`,
      "string.length": `"lastname" must contain at least 1 or maximum 255 characters`,
    }),
  email: Joi.string().min(8).max(255).email().trim().required().messages({
    "string.empty": `"email" is a required field.`,
    "email.base": `enter valid "email"`,
  }),
  mobileno: Joi.string().min(13).max(13).required().messages({
    "string.empty": `"mobile number" is a required field.`,
    "string.length": `"mobile number" must contain 10 digits.`,
  }),
  username: Joi.string().min(4).max(20).required().messages({
    "string.empty": `"username" is a required field.`,
    "string.length": `"username" must be between 4 to 20 character long.`,
  }),
  password: Joi.string().trim().min(8).max(35).regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/).required().messages({
    "string.empty": `"password" is a required field.`,
    "string.length": `"password" must contain 8 to 35 characters.`,
  }),
  role: Joi.string().trim().valid('Author','Reader').required() 
});

export default {
  signUp,
};
