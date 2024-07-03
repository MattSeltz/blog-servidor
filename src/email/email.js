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
    const {email,code} = req.body

    const user = await User.findOne({email})

    if(user) {
        let mailOptions = {
                from: USER_EMAIL, 
                to: email, 
                subject: "Recuperación de cuenta",
                html: `
                <h1>Código de recuperación de cuenta:</h1>
                <p>${code}</p>
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

export default router