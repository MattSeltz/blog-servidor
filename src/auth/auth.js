import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../models/users.models.js";
import { SECRET_KEY } from "../config/config.js";
import {generateInitialsIcon,uploadToCloudinary} from "../upload/upload.js"

const router = Router()

router.post("/register", async (req,res) => {
  const {username,email,password} = req.body

  try {
    const isMatchUser = await User.findOne({username,email})

    if(isMatchUser) {
      return res.sendStatus(400)
    }else{
      const imageBuffer = await generateInitialsIcon(username[0].toUpperCase());
      const cloudinaryResult = await uploadToCloudinary(imageBuffer);

      const hashedPassword = await bcrypt.hash(password,10)

      const user = new User({username,email,password:hashedPassword,icon:cloudinaryResult.secure_url})
      await user.save()

      res.json(user)
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
    const user = await User.findByIdAndUpdate(id,{password:hashedPassword})
    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.put("/user/:id", async (req,res) => {
  const {id} = req.params

  const {password,username} = req.body

  try {
    const imageBuffer = await generateInitialsIcon(username[0].toUpperCase());
    const cloudinaryResult = await uploadToCloudinary(imageBuffer);
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.findByIdAndUpdate(id,{password:hashedPassword,username,icon:cloudinaryResult.secure_url},{new:true})

    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.delete("/logout/:id", (req,res) => {
  res.clearCookie("token")
  res.json({message:"OK"})
})

export default router