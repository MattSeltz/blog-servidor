import {Router} from "express"

import { getData,getOneData,putData,deleteData } from "../controllers/users.controllers.js"
import {verifyToken} from "../middleware/auth.js"

const router = Router()

router.get("/", getData)
router.get("/:id", getOneData)
router.put("/:id", verifyToken, putData)
router.delete("/:id", verifyToken, deleteData)

export default router