import express from 'express'
import { addPost, getPost } from '../controllers/postController.js'

const router = express.Router()

router.post("/addpost", addPost)
router.get("/getpost/:id", getPost)


export default router