
const mail = require('../utils/mail.utils')
const bcrypt = require('bcryptjs')
const Patient = require('../models/patient.model')
const User = require('../models/user.model')

const PatientController = {

    getInfo : (async (req, res) => {
        try {
            const info = await Patient.getUserInfo(req.user.id)
            if(!info){
                return res.status(404).json({message: 'Non trouvé'})
            }

            return res.status(200).json({
                success: true,
                data: info
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    ModifierInfo : (async (req, res) => {
        try {
            const {fullName, email, telephone} = req.body
            const user = await User.getEmail(email)
            if(user && user.email !== email){
                return res.status(400).json({message: 'Compte déjà existant'})
            }

            await Patient.saveInfo(fullName, email, telephone, req.user.id)

            return res.status(200).json({
                success: true,
                message: 'Modification réussie avec succès'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),
}


module.exports = PatientController;