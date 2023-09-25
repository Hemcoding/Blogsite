import express from 'express';
import controller from "../../controller/comments/comment.js";

const router = express.Router();

router.post('/comment',controller.postComment);
router.post('/allcomment',controller.getComment);

export default {router}