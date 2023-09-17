import express from 'express'
import categories from '../../controller/categories/categories.js'

const router = express.Router()

router.post('/addCategory',categories.addCategory)
router.post('/showCategories',categories.showCategories)

export default {
    router
}