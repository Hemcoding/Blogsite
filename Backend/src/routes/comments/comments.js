import express from 'express'
import comments from '../../controller/comments/comments.js'

const router = express.Router()

router.post('/postComment',comments.postComment)
router.get('/getComments',comments.getComment)

export default {
    router
}