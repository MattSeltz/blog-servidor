import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { PORT,ENVIROMENT } from "./config/config.js"
import { db } from "./db/db.js"
import authRoutes from "./auth/auth.js"
import { verifyToken } from "./middleware/auth.js"

await db()

const app = express()

app.disable("x-powered-by")

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/auth",authRoutes)

app.get("/", verifyToken, (req,res) => {
  const date = new Date().getTime()
  let numeroStr = date.toString();

  if (numeroStr.length > 10) {
    numeroStr = numeroStr.substring(0, 10);
  }

  const tokenTime = parseInt(numeroStr, 10);
  
  if(req.user.exp > tokenTime) {
    res.json("Ruta privada")
  }else{
    res.redirect(400,ENVIROMENT)
  }
})

app.listen(PORT, () => console.log(`Servidor corriendo en ${ENVIROMENT}`))