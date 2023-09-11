import express from 'express'
import users from '../../controller/users/users.js'
const router = express.Router()

router.post('/registerUser',users.registerUser)

export default {router}