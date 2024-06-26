import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../models/users.models.js";
import { SECRET_KEY } from "../config/config.js";

const router = Router()

router.get("/:id", async (req,res) => {
  const {id} = req.params

  try {
    const user = await User.findById(id).populate("comments").populate({
      path:"publications",
      populate:"likes",
      populate:"author"
    })

    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post("/register", async (req,res) => {
  const {username,email,password} = req.body

  try {
    const isMatchUser = await User.findOne({username,email})

    if(isMatchUser) {
      return res.sendStatus(400)
    }else{
      const hashedPassword = await bcrypt.hash(password,10)

      const user = new User({username,email,password:hashedPassword})
      await user.save()

      res.sendStatus(200)
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post("/login", async (req,res) => {
  const {username,password} = req.body
  
  try {
    const isMatchUser = await User.findOne({username})

    if(!isMatchUser) {
      return res.sendStatus(400)
    }else{
      const isMatchPassword = await bcrypt.compare(password,isMatchUser.password)

      if(isMatchPassword) {
        const token = jwt.sign({username},SECRET_KEY,{expiresIn:"1h"})

        res.cookie("token",token,{ maxAge: 3600000 })
        res.json(isMatchUser)
      }else{
        res.sendStatus(400)
      }
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.put("/recovery/:id", async (req,res) => {
  const {id} = req.params

  const {password} = req.body

  try {
    const hashedPassword = await bcrypt.hash(password,10)
    await User.findByIdAndUpdate(id,{password:hashedPassword})
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.put("/like/:id", async (req,res) => {
  const {id} = req.params

  try {
    await User.findByIdAndUpdate(id,req.body)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.delete("/logout", (req,res) => {
  res.clearCookie("token")
  res.sendStatus(200)
})

export default router