
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendmail = require('../utils/mail.utils')
const SECRET_KEY_AUTH = process.env.SECRET_KEY_AUTH
const SECRET_KEY_OTP = process.env.SECRET_KEY_OTP
const User = require('../models/user.model')


const AuthController = {
    inscription : (async (req, res) => {
        try {
            const {fullName, email, password, telephone} = req.body
            
            const user = await User.getEmail(email)
            if(user) {
                if (user.est_creer){
                    return res.status(400).json({message: 'Ce compte existe déjà'})
                } if(!user.est_creer){
                    await User.supprimerUserByEmail(email)
                }
            }

            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            const hashOtp = await bcrypt.hash(otp, 10)
            const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

            const hashPassword = await bcrypt.hash(password, 10);

            const result = await User.creerCompte(fullName, email, hashPassword, telephone, hashOtp, otpExpire)

            sendmail(email, 'AlloDoc - Vérification adresse email',
                `<h2>Veuillez saisir ce code OTP de 6 chiffres dans l'application pour finaliser l'inscripton</h2>
                <p>CODE : ${otp}</p>
                <p>CODE VALABLE POUR 5 minutes à compter de la reception.</p>`
            )

            const token = jwt.sign(
                {id: result.insertId},
                SECRET_KEY_OTP,
                {expiresIn: '5m'}
            )

            return res.status(200).json({
                message: 'Code OTP à 6 chiffres envoyé sur votre adresse mail',
                data:{
                    token: token
                }
                
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
        
    }),

    veriferEmail : (async (req, res) => {
        try {
            const {otp} = req.body
            const user = await User.getUserById(req.user.id)
            if(!user){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            if (new Date() > user.otp_expire) {
                return res.status(400).json({
                    success: false, 
                    message: 'Code expiré'
                });
            }

            const otpCompare = await bcrypt.compare(otp, user.otp)
            if(!otpCompare){
                return res.status(400).json({message: 'Code OTP incorrect'})
            }

            await User.updateAfterVerify(true, true, req.user.id)

            await User.ajouterPatient(req.user.id)

            sendmail(user.email, 'AlloDoc - Bienvenue',
                `<h2>Votre compte sur AlloDoc a été créé avec succès</h3>`
            )

            return res.status(201).json({
                success: true,
                message: 'Inscription réussie'
            })


        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    connexion : (async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.getEmail(email)
            if(!user){
                return res.status(404).json({message: 'Pas encore de compte, veuillez vous inscrire'})
            }

            if(!user.est_verifie || !user.est_actif){
                return res.status(401).json({message: 'Compte non verifié ou désactivé'})
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if(!passwordCompare){
                return res.status(400).json({message: 'Informations incorrectes, veuillez ressayer.'})
            }

            const medecin = await User.getMedecinById(user.id)
            const patient = await User.getPatientById(user.id)
            const admin = await User.getAdminById(user.id)

            let role = medecin ? 'medecin' : patient ? 'patient' : admin ? 'admin' : null
            if(!role){
                return res.status(400).json({message: 'Rôle utilisateur non défini'})
            }

            const token = jwt.sign(
                {id: user.id, role, verifie: user.est_verifie, actif: user.est_actif},
                SECRET_KEY_AUTH,
                {expiresIn: '30d'}
            )

            return res.status(200).json({
                success: true,
                message: 'Connexion réussie',
                data: {
                    token: token,
                    role: role
                }
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    resetPassword : (async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.getEmail(email)
            if(!user){
                return res.status(404).json({message: 'Pas encore de compte, veuillez vous inscrire'})
            }

            const hashPassword = await bcrypt.hash(password, 10)
            await User.updatePassword(hashPassword, user.id)
            return res.status(200).json({
                success: true,
                message: 'Mot de passe réinitialisé avec succès'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    modifierPassword : (async (req, res) => {
        try {
            const { password } = req.body

            const user = await User.getUserById(req.user.id)
            if(!user){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const hashPassword = await bcrypt.hash(password, 10)
            await User.updatePassword(hashPassword, user.id)
            return res.status(200).json({
                success: true,
                message: 'Mot de passe changé avec succès'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    })
}


module.exports = AuthController;