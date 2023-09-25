import express from 'express';
import controller from "../../controller/categories/categories.js"

const router = express.Router();

router.post('/category',controller.insertcategory);
router.post('/allcat',controller.allcategory);

export default {router}