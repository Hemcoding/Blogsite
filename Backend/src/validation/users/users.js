import Joi from 'joi'

const userValidate = (create_data) => {
    const registerSchema = Joi.object({
        // password, firstname, lastname, email, mobile_no, role_id
        username: Joi.string().alphanum().min(3).max(30).required()
        .messages({
            "string.empty": ` "username" is a requires field. `,
            "string.length": ` "username" must contain 30 characters.            `
        }),
        password: Joi.string().trim().min(8).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,}$')).required()
        .messages({
            "string.empty": ` "password" is a required field. `,
            "string.error": ` "password" must contain atleast  one lowercase letter, one uppercase letter, one number, and one special character. `,
            "string.length": ` "password" must contain atleast 8 character`
        }),
        firstname: Joi.string().trim().min(3).max(255).required()
        .messages({
            "string.empty": ` "firstname" is a required field `,
            "string.length": `"firstname" must contain 255 character `
        }),
        lastname: Joi.string().trim().min(1).max(255).required()
        .messages({
          "string.empty": `"lastname" is a required field.`,
          "string.length": `"lastname" must contain 255 characters`
          }),
        email: Joi.string().email().trim().required()
        .messages({
            "string.empty": `"email" is a required field.`,
            "email.base": `enter valid "email"`
        }),
        mobile_no: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required()
        .messages({
            "string.empty": `"mobile number s a required field" `,
            "string.length": `Mobile number must be a 10-digit numeric value.`
        }),
        role: Joi.number().required()
        .messages({
            "number.empty": `"Role" is a required field.`,
            "number.base": `"Role" must be a number.`
        }),
        status: Joi.number().required()
        .messages({
            "number.empty": `"Status" is a required field.`,
            "number.base": `"Status" must be a number.`
        })

    }).options({ abortEarly: false })

    return registerSchema.validate(create_data)
}

export default userValidate;