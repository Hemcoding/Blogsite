import Joi from 'joi'

const verifyRoles = Joi.object({
    name: Joi.string().min(3).max(6).valid("Author","Reader").trim().required()
})

export default {
    verifyRoles
}