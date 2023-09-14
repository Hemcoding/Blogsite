import express from 'express'
import users from '../../controller/users/users.js'
const router = express.Router()

router.post('/registerUser',users.registerUser)
router.post('/loginUser',users.userLogin)

export default {router}