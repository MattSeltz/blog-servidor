import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sharp from 'sharp';
import cloudinary from 'cloudinary';

import { User } from "../models/users.models.js";
import { SECRET_KEY,CLOUD_NAME,API_KEY,API_SECRET } from "../config/config.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const router = Router()

const generateInitialsIcon = async initials => {
  const svgText = `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                    <style>
                      .background {
                        fill: #1565c0; /* Color de fondo */
                      }
                      .text {
                        font-family: 'Arial', sans-serif; /* Familia de fuente */
                        font-size: 100px; /* Tamaño de fuente */
                        fill: #ffffff; /* Color de texto */
                      }
                    </style>
                    <rect width="100%" height="100%" class="background"/>
                    <text x="30%" y="65%" class="text">${initials}</text>
                  </svg>`;

  const imageBuffer = await sharp(Buffer.from(svgText))
                          .png()
                          .toBuffer();

  return imageBuffer;
}

const uploadToCloudinary = imageBuffer => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(imageBuffer);
  });
}

router.get("/:id", async (req,res) => {
  const {id} = req.params

  try {
    const user = await User.findById(id).populate("comments").populate({
      path:"publications",
      populate:"likes",
      populate:"author"
    })

    res.json(user)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post("/register", async (req,res) => {
  const {username,email,password} = req.body

  try {
    const isMatchUser = await User.findOne({username,email})

    if(isMatchUser) {
      return res.sendStatus(400)
    }else{
      const imageBuffer = await generateInitialsIcon(username[0].toUpperCase());
      const cloudinaryResult = await uploadToCloudinary(imageBuffer);

      const hashedPassword = await bcrypt.hash(password,10)

      const user = new User({username,email,password:hashedPassword,icon:cloudinaryResult.secure_url})
      await user.save()

      res.sendStatus(200)
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.post("/login", async (req,res) => {
  const {username,password} = req.body
  
  try {
    const isMatchUser = await User.findOne({username})

    if(!isMatchUser) {
      return res.sendStatus(400)
    }else{
      const isMatchPassword = await bcrypt.compare(password,isMatchUser.password)

      if(isMatchPassword) {
        const token = jwt.sign({username},SECRET_KEY,{expiresIn:"1h"})

        res.cookie("token",token,{ maxAge: 3600000 })
        res.json(isMatchUser)
      }else{
        res.sendStatus(400)
      }
    }
  } catch (error) {
    res.sendStatus(400)
  }
})

router.put("/recovery/:id", async (req,res) => {
  const {id} = req.params

  const {password} = req.body

  try {
    const hashedPassword = await bcrypt.hash(password,10)
    await User.findByIdAndUpdate(id,{password:hashedPassword})
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.put("/like/:id", async (req,res) => {
  const {id} = req.params

  try {
    await User.findByIdAndUpdate(id,req.body)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400)
  }
})

router.delete("/logout", (req,res) => {
  res.clearCookie("token")
  res.sendStatus(200)
})

export default router