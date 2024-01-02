import joi from "joi";

const checkComment = joi.object({
    comment : joi.string().min(2).max(2000).required().messages({
        'string.empty':`"comment" is a required field.`
    }),
    blog_id: joi.number().min(1).required().messages({
        'number.empty':`"Blog id" is a required field.`
    })
})

const getComment = joi.object({
    blog_id : joi.number().min(1).required().messages({
        'number.empty':`"Blog id" is a required field.`
    })
})

export default {
    checkComment,
    getComment
}