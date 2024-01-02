import express from 'express'
import roles from '../../controller/roles/roles.js'

const router = express.Router()

//routes related to Role
router.post('/addRole',roles.addRole)
router.post('/showRoles',roles.showRoles)

export default {
    router
}