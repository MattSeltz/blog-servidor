import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { PORT,ENVIRONMENT } from "./config/config.js"
import { db } from "./db/db.js"
import authRoutes from "./auth/auth.js"
import { verifyToken } from "./middleware/auth.js"
import emailRoutes from "./email/email.js"
import publicationRoutes from "./routes/publications.routes.js"
import commentRoutes from "./routes/comments.routes.js"

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
app.use("/publication",publicationRoutes)
app.use("/comment",commentRoutes)

app.listen(PORT, () => console.log(`Servidor corriendo en ${ENVIRONMENT}`))