import sharp from 'sharp';
import cloudinary from 'cloudinary';

import { CLOUD_NAME,API_KEY,API_SECRET } from "../config/config.js";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

export const generateInitialsIcon = async initials => {
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

export const uploadToCloudinary = imageBuffer => {
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