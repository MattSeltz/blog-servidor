import jwt from "jsonwebtoken"

import { SECRET_KEY } from "../config/config.js"

export const verifyToken = (req,res,next) => {
  const {token} = req.cookies

  if(token) {
    const isMatchToken = jwt.verify(token,SECRET_KEY)

    req.user = isMatchToken

    next()
  }else{
    return res.status(400).send("Falla al verificar Token")
  }
}