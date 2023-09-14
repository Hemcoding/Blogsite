import express from 'express'
import blogs from '../../controller/blogs/blogs.js'
import blog from '../../middleware/blogs/blogs.js'

const router = express.Router()

router.post('/postBlog',blog.upload.single('image'),blogs.postBlog)
router.post('/getBlogs',blogs.fetchBlogs)
router.post('/likes',blogs.likes)
router.post('/dislikes',blogs.dislikes)

export default {
    router
}