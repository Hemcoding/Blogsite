import express from 'express'
import roles from '../../controller/roles/roles.js'

const router = express.Router()

router.post('/addRole',roles.addRole)
router.get('/showRoles',roles.showRoles)

export default {
    router
}