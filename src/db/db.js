import mongoose from "mongoose";

import { MONGODB_KEY } from "../config/config.js";

export const db = async () => {
  try {
    await mongoose.connect(MONGODB_KEY)
    console.log("Conectado a Mongo DB")
  } catch (error) {
    console.error(error)
  }
}