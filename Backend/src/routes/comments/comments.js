import express from 'express'
import comments from '../../controller/comments/comments.js'

const router = express.Router()

router.post('/postComment',comments.postComment)
router.post('/getComments',comments.getComment)

export default {
    router
}