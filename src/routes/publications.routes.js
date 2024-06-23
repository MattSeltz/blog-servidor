import {Router} from "express"

import { getData,getOneData,postData,putData,deleteData } from "../controllers/publications.controllers.js"

const router = Router()

router.get("/", getData)
router.get("/:id", getOneData)
router.post("/", postData)
router.put("/:id", putData)
router.delete("/:id", deleteData)

export default router