import nodemailer from "nodemailer"
import { Router } from "express";

import { User } from "../models/users.models.js";
import { USER_EMAIL,PASSWORD_EMAIL } from "../config/config.js";

const router = Router()

let transporter = nodemailer.createTransport({
    service: "outlook", 
    auth: {
        user: USER_EMAIL, 
        pass: PASSWORD_EMAIL
    }
});

router.post("/recovery", async (req,res) => {
    const {token} = req.cookies
    const {email} = req.body

    const user = await User.findOne({email})

    if(user) {
        let mailOptions = {
                from: USER_EMAIL, 
                to: email, 
                subject: "Recuperación de cuenta",
                html: `
                <h1>Accede al siguiente enlace para generar una nueva contraseña</h1>
                <a href="http://localhost:3000/email/verify-token/${user._id}?token=${token}" target="_blank">Generar nueva contraseña</a>
                `
            };

        try {
            await transporter.sendMail(mailOptions);

            res.sendStatus(200)
        } catch (error) {
            res.sendStatus(400)
        }
    }else{
        res.sendStatus(400)
    } 
})

router.get('/verify-token/:id', (req, res) => {
  const token = req.query.token;
  const {id} = req.params

  res.cookie('token', token); 

  res.redirect(`http://localhost:5173/recovery/${id}`); 
});

export default router