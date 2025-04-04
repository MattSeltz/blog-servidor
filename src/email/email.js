import nodemailer from "nodemailer";
import { Router } from "express";

import { User } from "../models/users.models.js";
import { USER_EMAIL, PASSWORD_EMAIL } from "../config/config.js";

const router = Router();

let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: USER_EMAIL,
		pass: PASSWORD_EMAIL,
	},
});

router.post("/recovery", async (req, res) => {
	const { email, code } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		let mailOptions = {
			from: '"Soporte" <xyz.corp@gmail.com>',
			to: email,
			subject: "Restablece tu contraseña",
			html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <div style="width: 100%; max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #395974; text-align: center; padding: 20px; color: white; font-size: 24px;">
            <strong>Restablecer Contraseña</strong>
        </div>
        <div style="padding: 20px; font-size: 16px; line-height: 1.5; color: #555;">
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Copia y pega en el navegador el siguiente código para continuar:</p>
            <p style="font-weight: bold; font-size: 18px; color: #395974; background-color: #f0f0f0; padding: 10px; border-radius: 4px;">
                ${code}
            </p>
            <p>Si no solicitaste esto, ignora este correo.</p>
        </div>
    </div>

    <footer style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
        <p>&copy; 2025 XYZ. Todos los derechos reservados.</p>
    </footer>
</div>
    `,
		};

		try {
			await transporter.sendMail(mailOptions);

			res.sendStatus(200);
		} catch (error) {
			res.status(400).send("Falla al enviar email");
		}
	} else {
		res.status(400).send("Falla al crear email");
	}
});

export default router;
