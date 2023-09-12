import Joi from 'joi'

const verifyBlog = Joi.object({
    title : Joi.string().min(10).max(80).trim().required().messages({
        "string.empty": `"Blog title" is a required field.`
    }),
    description : Joi.string().min(120).max(1500).trim().required().messages({
        "string.empty": `"Blog title" is a required field.`,
        "string.length":`"Blog description" must have 120 words and maximum upto 1500 words` 
    }),
    category_id: Joi.number().min(1).max(20).required().messages({
        "string.empty":`"category id" is a required field.`
    }), 
})

export default {
    verifyBlog
}