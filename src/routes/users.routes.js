import {Router} from "express"

import { getData,getOneData,putData,deleteData } from "../controllers/users.controllers.js"

const router = Router()

router.get("/", getData)
router.get("/:id", getOneData)
router.put("/:id", putData)
router.delete("/:id", deleteData)

export default router