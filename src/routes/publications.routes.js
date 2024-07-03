import {Router} from "express"

import { getData,getOneData,postData,putData,deleteData } from "../controllers/publications.controllers.js"
import {verifyToken} from "../middleware/auth.js"

const router = Router()

router.get("/", getData)
router.get("/:id", getOneData)
router.post("/", verifyToken, postData)
router.put("/:id", verifyToken,  putData)
router.delete("/:id", verifyToken, deleteData)

export default router