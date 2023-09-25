import Joi from 'joi';

const categories = Joi.object({
    name: Joi.string().min(3).max(50).required().trim()
});


export default {
    categories
}