
require('dotenv').config()
const bcrypt = require('bcryptjs')
const sendMail = require('../utils/mail.utils')
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
const RendezVous = require('../models/rdv.model')
const formatDate = require('../utils/date.utils')
const Specialite = require('../models/specialite.model')

const AdminController = {

    creerMedecin : (async (req, res) => {
        try {
            const {fullName, email, password, specialiteId} = req.body

            const userExiste = await User.getEmail(email)
            if(userExiste) {
                return res.status(400).json({message: 'Ce compte existe déjà'})
            }

            const specialiteExiste = await Specialite.getSpecialiteById(specialiteId)
            if(!specialiteExiste) {
                return res.status(400).json({message: 'Spécialité non trouvée'})
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const result = await User.ajouterUser(fullName, email, hashPassword)

            await User.ajouterMedecin(result.insertId, specialiteId)

            sendMail(email, 'AlloDoc - Crétaion de compte',
                `<h2>Votre compte a été créé avec succès. Vos identifiants sont les suivants:</h2>
                <h3>email : ${email}</h3>
                <h3>mot de passe : ${password}</h3>
                <p>Vous pouvez à tout moment modifier votre mot de passe une fois connecté.</p>`
            )

            return res.status(201).json({
                success: true,
                message: 'Compte médécin créé'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    obtenirToutesLesSpecialites : (async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const specialites = await Admin.getAllSpecialite(limit, offset)
            
            return res.status(200).json({
                success: true,
                data: {
                    specialites : specialites,
                    page,
                    limit
                },
                
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    obgetenirLesStats : (async (req, res) => {
        try {
            const user = await Admin.gettotalUser()
            if(!user){
                return res.status(404).json({message: 'Pas encore de donnée'})
            }
            const medecin = await Admin.gettotalMedecin()
            if(!medecin){
                return res.status(404).json({message: 'Pas encore de donnée'})
            }
            const patient = await Admin.gettotalPatient()
            if(!patient){
                return res.status(404).json({message: 'Pas encore de donnée'})
            }
            const specialite = await Admin.gettotalSpecialite()
            if(!specialite){
                return res.status(404).json({message: 'Pas encore de donnée'})
            }
            const rendezVous = await Admin.gettotalRdv()
            if(!rendezVous){
                return res.status(404).json({message: 'Pas encore de donnée'})
            }


            return res.status(200).json({
                success: true,
                data: {
                    user: user.total_user,
                    medecin: medecin.total_medecin,
                    patient: patient.total_patient,
                    rendezVous: rendezVous.total_rdv,
                    specialite: specialite.total_specialite
                    
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


    getAllRdv : (async (req, res) => {
        try {

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const rdv = await Admin.getRdv(false, limit, offset)

            return res.status(200).json({
                success: true,
                data: {
                    rdv: rdv,
                    page,
                    limit
                    
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

    annulerRendezVous : (async (req, res) => {
        try {
            const {id} = req.params
            const {motif} = req.body
            
            const rendez_vous = await RendezVous.getRendezvousById(id)
            if(!rendez_vous){
                return res.status(404).json({message: 'RendezVous non trouvé'})
            }

            const user = await User.getMedecin(rendez_vous.medecinId)
            if(!user){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const userPatient = await User.getPatient(rendez_vous.patientId)
            if(!userPatient){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const medecin = await User.getUserById(user.userId)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const patient = await User.getUserById(userPatient.userId)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            await RendezVous.updateStatut('annulé', motif, id)

            sendMail(medecin.email, `AlloDoc - Nouvelle annulation - ${medecin.fullName}`,
                `<h2>Le rendez vous pour le ${formatDate(rendez_vous.date)} à ${rendez_vous.heures} a été annulé</h2>
                <h3>Informations du patient</h3>
                <h5>Patient : ${patient.fullName}</h5>
                <h5>Email : ${patient.email}</h5>
                <h5>Telephone : ${patient.telephone}</h5>
                <p>Bonne suite du travail.</p>`
            )

            sendMail(patient.email, `AlloDoc - Rendez Vous annuler`,
                `<h2>Le rendez vous avec ${medecin.fullName} prévu pour le ${formatDate(rendez_vous.date)} à ${rendez_vous.heures} a été annulé</h2>
                
                <h3>Motif</h3>
                <h3>${motif}</h3>
                <p>Bonne suite du travail.</p>`
            )

            return res.status(201).json({
                success: true,
                message: 'Rendez vous annulé avec succès'
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    getAllUser : (async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit


            const user = await User.getAllUserNoAdmin(req.user.id, limit, offset)
            
            return res.status(200).json({
                success: true,
                data: {
                    user: user,
                    page,
                    limit
                },
                
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    changerStatutCompte : (async (req, res) => {
        try {

            const {id} = req.params

            const userExist = await User.getUserById(id)
            if(!userExist){
                return res.status(404).json({message: 'Utilisateur introuvable'})
            }

            const est_actif = Number(userExist.est_actif)


            if(est_actif === 1){
                await Admin.updateCompte(0, id)
                return res.status(200).json({
                    success: true,
                    message: 'Compte utilisateur désactivé'
                })
            } else {
            
            await Admin.updateCompte(1, id)

            return res.status(200).json({
                success: true,
                message: 'Compte utilisateur activé'
            })}
            
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),


    ToutesLesSpecialites : (async (req, res) => {
        try {
            const specialites = await Admin.Specialite()
            
            return res.status(200).json({
                success: true,
                data: {
                    specialites : specialites,
                },
                
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),


    getMedecins :  (async (req, res) => {
         try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const medecin = await Admin.getInfoMedecin(limit, offset)
            
            return res.status(200).json({
                success: true,
                data: {
                    medecin: medecin,
                    page,
                    limit
                },
                
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


module.exports = AdminController;