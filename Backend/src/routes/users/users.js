import express from 'express'
import users from '../../controller/users/users.js'
import user from '../../middleware/users/users.js'
const router = express.Router()

router.post('/registerUser',users.registerUser)
router.post('/loginUser',users.userLogin)
router.post('/setProfile',user.upload.single('image'),users.imageUpload)
router.post('/getProfile',users.getProfile)

export default {router}