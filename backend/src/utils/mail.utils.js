require('dotenv').config()
const nodemailer = require('nodemailer')

async function EnvoyerEmail(email, objet, contenu) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: objet,
            html: contenu
        })
    } catch (error) {
        console.log(error.message || 'Erreur d\'envoie du mail')
    }
}

module.exports = EnvoyerEmail;