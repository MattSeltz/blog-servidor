import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import { User } from "../models/users.models.js";
import { SECRET_KEY } from "../config/config.js";
import {generateInitialsIcon,uploadToCloudinary} from "../upload/upload.js"
import {verifyToken} from "../middleware/auth.js"

const router = Router()

router.post("/register", async (req,res) => {
  const {username,email,password} = req.body

  try {
    const isMatchUser = await User.findOne({username,email})

    if(isMatchUser) {
      return res.status(400).send("Usuario existente")
    }else{
      const imageBuffer = await generateInitialsIcon(username[0].toUpperCase());
      const cloudinaryResult = await uploadToCloudinary(imageBuffer);

      const hashedPassword = await bcrypt.hash(password,10)

      const user = new User({username,email,password:hashedPassword,icon:cloudinaryResult.secure_url})
      await user.save()

      res.json(user)
    }
  } catch (error) {
    res.status(400).send("Falla al crear usuario")
  }
})

router.post("/login", async (req,res) => {
  const {username,password} = req.body
  
  try {
    const isMatchUser = await User.findOne({username})

    if(!isMatchUser) {
      return res.status(400).send("Usuario inexistente")
    }else{
      const isMatchPassword = await bcrypt.compare(password,isMatchUser.password)

      if(isMatchPassword) {
        const token = jwt.sign({username},SECRET_KEY,{expiresIn:"1h"})

        res.cookie("token",token,{ maxAge: 3600000, httpOnly: true, secure: true, sameSite: "None" })
        res.json(isMatchUser)
      }else{
        res.status(400).send("Contraseña errónea")
      }
    }
  } catch (error) {
    res.status(400).send("Falla al iniciar sesión")
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
    res.status(400).send("Falla al actualizar usuario")
  }
})

router.put("/user/:id", verifyToken,  async (req,res) => {
  const {id} = req.params

  const {password,username} = req.body

  try {
    const imageBuffer = await generateInitialsIcon(username[0].toUpperCase());
    const cloudinaryResult = await uploadToCloudinary(imageBuffer);
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await User.findByIdAndUpdate(id,{password:hashedPassword,username,icon:cloudinaryResult.secure_url},{new:true})

    res.json(user)
  } catch (error) {
    res.status(400).send("Falla al actualizar usuario")
  }
})

router.delete("/logout/:id", verifyToken, (req,res) => {
  res.clearCookie("token")
  res.json({message:"OK"})
})

export default router