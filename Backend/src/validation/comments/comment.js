import Joi from 'joi';

const postvalidateComment = Joi.object({
    comment: Joi.string().min(3).max(255).required().trim(),
    blog_id: Joi.number().positive().required(),
});


const getvalidateComment = Joi.object({
    blog_id: Joi.number().positive().required()
})
export default {
    postvalidateComment,
    getvalidateComment
}