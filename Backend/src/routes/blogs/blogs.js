import express from 'express'
import blogs from '../../controller/blogs/blogs.js'
import blog from '../../middleware/blogs/blogs.js'

const router = express.Router()

//routes related to Blog
router.post('/postBlog',blog.upload.single('image'),blogs.postBlog)
router.post('/getBlogs',blogs.fetchBlogs)
router.post('/blogsByCategory',blogs.fetchBlogsCategory)
router.post('/blogsByUsername',blogs.fetchBlogsUser)
router.post('/blogsById',blogs.fetchBlogsById)
router.post('/likes',blogs.likes)
router.post('/dislikes',blogs.dislikes)
router.delete('/deleteBlog',blogs.deleteBlog)

export default {
    router
}