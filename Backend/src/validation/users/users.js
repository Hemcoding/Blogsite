import Joi from "joi";

const signUp = Joi.object({
  firstname: Joi.string()
    .min(1)
    .max(255)
    .regex(/^[A-Z, a-z]+$/)
    .required()
    .messages({
      "string.empty": `"First Name" is a required field.`,
      "string.length": `"First Name" must contain at least 1 or maximum 255 characters`,
    }),
  lastname: Joi.string()
    .min(1)
    .max(255)
    .regex(/^[A-Z, a-z]+$/)
    .required()
    .messages({
      "string.empty": `"Last Name" is a required field.`,
      "string.length": `"Last Name" must contain at least 1 or maximum 255 characters`,
    }),
  email: Joi.string().min(8).max(255).email().trim().required().messages({
    "string.empty": `"Email" is a required field.`,
    "email.base": `enter valid "email"`,
  }),
  mobileno: Joi.string().min(13).max(13).required().messages({
    "string.empty": `"Mobile Number" is a required field.`,
    "string.length": `"Mobile Number" must contain 10 digits.`,
  }),
  username: Joi.string().min(4).max(20).required().messages({
    "string.empty": `"Username" is a required field.`,
    "string.length": `"Username" must be between 4 to 20 character long.`,
  }),
  password: Joi.string().trim().min(8).max(35).regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/).required().messages({
    "string.empty": `"Password" is a required field.`,
    "string.length": `"Password" must contain 8 to 35 characters.`,
  }),
  role: Joi.string().trim().valid('Author','Reader').required() 
});

const login = Joi.object({
  email: Joi.string().min(4).trim().required().messages({
    "string.empty": `"Email" is a required field.`,
    "string.length": `"Email" must be between 4 to 20 character long.`,
  }),
  password: Joi.string().trim().min(8).max(35).regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/).required().messages({
    "string.empty": `"Password" is a required field.`,
    "string.length": `"Password" must contain 8 to 35 characters.`,
  })
})

const passwordResetEmail = Joi.object({
  email: Joi.string().min(8).max(255).email().trim().required().messages({
    "string.empty": `"Email" is a required field.`,
    "email.base": `enter valid "Email"`,
  })
})

const passwordReset = Joi.object({
  token:Joi.string().required(),
  newPassword: Joi.string().trim().min(8).max(35).regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/).required().messages({
    "string.empty": `"Password" is a required field.`,
    "string.length": `"Password" must contain 8 to 35 characters.`,
  })
})

const aboutAuth = Joi.object({
  about : Joi.string().min(20).required().messages({
    'string.empty':`"About is a required field."`
  })
})

export default {
  signUp,
  login,
  passwordResetEmail,
  passwordReset,
  aboutAuth
};
