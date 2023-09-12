import express from 'express'
import blogs from '../../controller/blogs/blogs.js'

const router = express.Router()

router.post('/postBlog',blogs.postBlog)

export default {
    router
}