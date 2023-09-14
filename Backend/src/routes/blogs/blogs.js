import express from 'express'
import blogs from '../../controller/blogs/blogs.js'

const router = express.Router()

router.post('/postBlog',blogs.postBlog)
router.get('/getBlogs',blogs.fetchBlogs)
router.get('/likes',blogs.likes)

export default {
    router
}