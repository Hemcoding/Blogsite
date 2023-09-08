import express from 'express'
import roles from '../controller/roles.js'

const router = express.Router()

router.post('/addRole',roles.addRole)

export default {
    router
}