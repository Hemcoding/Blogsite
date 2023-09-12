import express from 'express'
import categories from '../../controller/categories/categories.js'

const router = express.Router()

router.post('/addCategory',categories.addCategory)
router.get('/showCategories',categories.showCategories)

export default {
    router
}