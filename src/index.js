import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { PORT,ENVIRONMENT,CORS } from "./config/config.js"
import { db } from "./db/db.js"
import authRoutes from "./auth/auth.js"
import emailRoutes from "./email/email.js"
import userRoutes from "./routes/users.routes.js"
import publicationRoutes from "./routes/publications.routes.js"
import commentRoutes from "./routes/comments.routes.js"

await db()

const app = express()

app.disable("x-powered-by")

app.use(express.json())
app.use(cors(
  {origin: CORS, 
  credentials: true}
))
app.use(cookieParser())

app.use("/auth",authRoutes)
app.use("/email",emailRoutes)
app.use("/user",userRoutes)
app.use("/publication",publicationRoutes)
app.use("/comment",commentRoutes)

app.listen(PORT, () => console.log(`Servidor corriendo en ${ENVIRONMENT}`))