import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {User} from "../models/users.models.js"
import {SECRET_KEY} from "../config/config.js"

export const register = async (req,res) => {
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
}

export const login = async (req,res) => {
  const {username,password} = req.body
  
  try {
    const isMatchUser = await User.findOne({username})

    if(!isMatchUser) {
      return res.sendStatus(400)
    }else{
      const isMatchPassword = await bcrypt.compare(password,isMatchUser.password)

      if(isMatchPassword) {
        const token = jwt.sign({username},SECRET_KEY,{expiresIn:"1h"})

        res.cookie("token",token)
        res.sendStatus(200)
      }else{
        res.sendStatus(400)
      }
    }
  } catch (error) {
    res.sendStatus(400)
  }
}

export const logout = (req,res) => {
  res.clearCookie("token")
  res.sendStatus(200)
}