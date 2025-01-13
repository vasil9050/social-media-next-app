import express from 'express'
import { addUser, getUser, getUserByUsername, updateUser } from '../controllers/usersController.js'

const router = express.Router()

router.post("/adduser", addUser)
router.post("/updateuser", updateUser)

router.get("/getuser/:id", getUser)
router.get("/getuserbyusername/:username", getUserByUsername)

export default router