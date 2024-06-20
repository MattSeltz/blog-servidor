import "dotenv/config"

export const PORT = process.env.PORT ?? 3000

export const ENVIRONMENT = process.env.ENVIRONMENT ?? `http://localhost:${PORT}`

export const MONGODB_KEY = process.env.MONGODB_KEY ?? "mongodb://localhost:27017/blog"

export const SECRET_KEY = process.env.SECRET_KEY ?? "Matías-Seltzer"