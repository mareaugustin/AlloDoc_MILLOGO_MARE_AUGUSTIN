

const sendMail = require('../utils/mail.utils')
const formatDate = require('../utils/date.utils')
const RendezVous = require('../models/rdv.model')
const User = require('../models/user.model')

const RendezVousController = {

    mesRendezVous : (async (req, res) => {
        try {
            const patient = await RendezVous.getPatientById(req.user.id)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur non associé à cet rendez-vous'})
            }

            const rendez_vous = await RendezVous.getAllRendezvous(patient.id)
            const rendez_vous_passer = await RendezVous.getRendezvousPasser(patient.id)
            const rendez_vous_annuler = await RendezVous.getStatutRendezvous('annulé', patient.id)
            const rendez_vous_confirmer = await RendezVous.getStatutRendezvous('confirmé', patient.id)

            return res.status(200).json({
                success: true,
                data: {
                    rendez_vous,
                },
                total_rdv: rendez_vous.length,
                total_rdv_anuller: rendez_vous_annuler.length,
                total_rdv_confirmer: rendez_vous_confirmer.length,
                total_rdv_passer: rendez_vous_passer.length
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    prendreRendezVous : (async (req, res) => {
        try {
            const {date, heures, medecinId} = req.body

            const patient = await RendezVous.getPatientById(req.user.id)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur introuvable'})
            }

            const user = await User.getMedecin(medecinId)
            
            if(!user){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const medecin = await User.getUserById(user.userId)
            
            
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const rdv_infos = await User.getUserById(req.user.id)
            if(!rdv_infos){
                return res.status(404).json({message: 'Infos non trouvé'})
            }

            await RendezVous.ajouterRendezvous(date, heures, patient.id, medecinId)

            sendMail(medecin.email, `AlloDoc - Nouveau Rendez-vous - ${medecin.fullName}`,
                `<h2>Nouvelle confirmation de prise de rendez vous pour le ${formatDate(date)} à ${heures}</h2>
                <h3>Informations du patient</h3>
                <h5>Patient : ${rdv_infos.fullName}</h5>
                <h5>Email : ${rdv_infos.email}</h5>
                <h5>Telephone : ${rdv_infos.telephone}</h5>
                <p>En cas d'indisponibilité, veuillez notifier l'admin avant la date du rendez-vous.</p>`
            )

            return res.status(201).json({
                success: true,
                message: 'Rendez vous prise avec succès'
            })
            
        } catch (error) {
            if(error.code === 'ER_DUP_ENTRY'){
                return res.status(400).json({
                    success: false,
                    message: 'Vous avez déjà pris ce rendez-vous'
                })
            }
            
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

            const patient = await RendezVous.getPatientById(req.user.id)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur introuvable'})
            }
            
            const rendez_vous = await RendezVous.getRendezvousById(id)
            if(!rendez_vous){
                return res.status(404).json({message: 'RendezVous non trouvé'})
            }

            const rows = await RendezVous.getPatientDuRdv(id, patient.id)
            if(!rows){
                return res.status(401).json({message: 'Pas authorisé a annulé cet RDV'})
            }

            const user = await User.getMedecin(rendez_vous.medecinId)
            if(!user){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const medecin = await await User.getUserById(user.userId)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const rdv_infos = await User.getUserById(req.user.id)
            if(!rdv_infos){
                return res.status(404).json({message: 'Infos non trouvé'})
            }

            await RendezVous.updateStatutRendezvous('annulé', id)

            sendMail(medecin.email, `AlloDoc - Nouvelle annulation - ${medecin.fullName}`,
                `<h2>Le rendez vous pour le ${formatDate(rendez_vous.date)} à ${rendez_vous.heures} a été annulé</h2>
                <h3>Informations du patient</h3>
                <h5>Patient : ${rdv_infos.fullName}</h5>
                <h5>Email : ${rdv_infos.email}</h5>
                <h5>Telephone : ${rdv_infos.telephone}</h5>
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

    supprimerRendezVous : (async (req, res) => {
        try {
            const {id} = req.params

            const patient = await RendezVous.getPatientById(req.user.id)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur introuvable'})
            }
            
            const rendez_vous = await RendezVous.getRendezvousById(id)
            if(!rendez_vous){
                return res.status(404).json({message: 'RendezVous non trouvé'})
            }

            const rows = await RendezVous.getPatientDuRdv(id, patient.id)
            if(!rows){
                return res.status(401).json({message: 'Pas authorisé a supprimé cet RDV'})
            }

            await RendezVous.supprimerRendezvous(id)

            return res.status(201).json({
                success: true,
                message: 'Rendez vous supprimé avec succès'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    deleteAllRendezVous : (async (req, res) => {
        try {

            const patient = await RendezVous.getPatientById(req.user.id)
            if(!patient){
                return res.status(404).json({message: 'Utilisateur introuvable'})
            }
            
            const rendez_vous = await RendezVous.getRendezvousPatient(patient.id)
            if(!rendez_vous){
                return res.status(404).json({message: 'RendezVous non trouvé'})
            }

            await RendezVous.supprimerTousRendezvous(patient.id)

            return res.status(201).json({
                success: true,
                message: 'Tous vos RendezVous ont été supprimé avec succès'
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

module.exports = RendezVousController;