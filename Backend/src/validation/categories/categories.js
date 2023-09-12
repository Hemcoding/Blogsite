import Joi from 'joi'

const verifyCategory = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        "string.empty": `"name" is a required field.`
    })
})

export default {
    verifyCategory
}