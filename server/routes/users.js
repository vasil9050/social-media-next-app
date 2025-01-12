import express from 'express'
import { addUser, getUser, updateUser } from '../controllers/usersController.js'

const router = express.Router()

router.post("/adduser", addUser)
router.post("/updateuser", updateUser)

router.get("/getuser/:id", getUser)

export default router