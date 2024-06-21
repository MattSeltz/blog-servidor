import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { PORT,ENVIRONMENT } from "./config/config.js"
import { db } from "./db/db.js"
import authRoutes from "./auth/auth.js"
import { verifyToken } from "./middleware/auth.js"
import emailRoutes from "./email/email.js"

await db()

const app = express()

app.disable("x-powered-by")

app.use(express.json())
app.use(cors(
  {origin: "http://localhost:5173", 
  credentials: true}
))
app.use(cookieParser())

app.use("/auth",authRoutes)
app.use("/email",emailRoutes)

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
    res.redirect(400,ENVIRONMENT)
  }
})

app.listen(PORT, () => console.log(`Servidor corriendo en ${ENVIRONMENT}`))