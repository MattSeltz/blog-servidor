import "dotenv/config";

export const PORT = process.env.PORT ?? 3000;

export const ENVIRONMENT =
  process.env.ENVIRONMENT ?? `http://localhost:${PORT}`;

export const MONGODB_KEY =
  process.env.MONGODB_KEY ?? "mongodb://localhost:27017/blog";

export const SECRET_KEY = process.env.SECRET_KEY ?? "Matías-Seltzer";

export const USER_EMAIL = process.env.USER_EMAIL ?? "matiselt@outlook.es";

export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL ?? "11144550s";

export const CLOUD_NAME = process.env.CLOUD_NAME ?? "daeqryito";

export const API_KEY = process.env.API_KEY ?? "793988317468657";

export const API_SECRET =
  process.env.API_SECRET ?? "-zvjpmsxkrMkNKIfObrWo_nZQa4";

export const CORS = process.env.CORS ?? "http://localhost:5173"