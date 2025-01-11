import express from 'express'
import { addUser, getUser } from '../controllers/usersController.js'

const router = express.Router()

router.post("/adduser", addUser)
router.get("/getuser/:id", getUser)

export default router