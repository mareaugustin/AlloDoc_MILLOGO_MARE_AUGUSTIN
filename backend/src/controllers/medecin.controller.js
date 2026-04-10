
const Medecin = require('../models/medecin.model')
const User = require('../models/user.model')
const dateAujourdhui = new Date().toISOString().split('T')[0]

const MedecinController = {

    obtenirTotalRdv : (async (req, res) => {
        try{
            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const total = await Medecin.getTotalRdvByMedecin(medecin.id)
            const totalAujourdhui = await Medecin.getTotalRdvAujourdhui(dateAujourdhui, medecin.id)

            return res.status(200).json({
                success: true,
                data: {
                    total_rdv : total.total_rdv,
                    totalToday : totalAujourdhui.total_aujourdui
                }
            })
        } catch (error) {
                return res.status(500).json({
                    success: false,
                    erreur: 'Erreur interne serveur',
                    message: error.message
                })
            }
        }
    ),

    InfoRdv : (async (req, res) => {
        try{
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page -1) * limit

            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const infos = await Medecin.getRdvAvecInfoPatient(dateAujourdhui, medecin.id, limit, offset)
            
            return res.status(200).json({
                success: true,
                data: {
                    patient: infos,
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
        }
    ),


    mesHoraires : (async (req, res) => {
        try{

            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const rows = await Medecin.listeHoraire(medecin.id)
            
            return res.status(200).json({
                success: true,
                data: {
                    horaires: rows
                }
            })
        } catch (error) {
                return res.status(500).json({
                    success: false,
                    erreur: 'Erreur interne serveur',
                    message: error.message
                })
            }
        }
    ),


    mesInfos : (async (req, res) => {
        try{

            const infos = await Medecin.getInfos(req.user.id)
            if(!infos){
                return res.status(404).json({message: 'Infos non trouvé'})
            }

            return res.status(200).json({
                success: true,
                data: {
                    medecin: infos
                }
            })
        } catch (error) {
                return res.status(500).json({
                    success: false,
                    erreur: 'Erreur interne serveur',
                    message: error.message
                })
            }
        }
    ),

    ModifierInfo : (async (req, res) => {
        try {
            const {fullName, a_propos, formation} = req.body

            await Medecin.saveInfo(fullName, a_propos, formation, req.user.id)

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


module.exports = MedecinController;