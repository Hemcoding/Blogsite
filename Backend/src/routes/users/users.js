import express from "express";
import users from "../../controller/users/users.js";
// import authLogin from '../../middleware/users/users.js'

const router = express.Router()
router.post("/login",users.userlogin)
// router.post("/logout",logout)



export default {router}