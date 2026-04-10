

const User = require('../models/user.model')
const Disponibilite = require('../models/horaires.model')

const HoraireController = {

    definirHoraires : (async (req, res) => {
        try {
            const {date, heures} = req.body

            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            await Disponibilite.ajouterHoraire(date, heures, medecin.id)

            return res.status(201).json({
                success: true,
                message: 'Horaire bien défini'
            })
             
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'Horaire déjà défini'
                })
            }

            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    mesHoraires : (async (req, res) => {
        try {
            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

           const horaires = await Disponibilite.getHoraireByMedecin(medecin.id)
            return res.status(200).json({
                success: true,
                data: horaires,
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    modifierHoraires : (async (req, res) => {
        try {
            const {id} = req.params
            const {date, heures} = req.body

            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const horaires = await Disponibilite.getHoraireById(id)
            if(!horaires){
                return res.status(404).json({message: 'Planning non trouvé'})
            }

            const rows = await Disponibilite.getMedecinAssocier(medecin.id, id)
            if(!rows){
                return res.status(401).json({message: 'Medecin non approprié à la mise à jour'})
            }

            await Disponibilite.modifierHoraire(date, heures, id)

            return res.status(200).json({
                success: true,
                message: 'Mis à jour du planning réussi'
            })


        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'Horaire déjà défini'
                })
            }
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    supprimerHoraires : (async (req, res) => {
        try {
            const {id} = req.params
            const medecin = await User.getMedecinById(req.user.id)
            if(!medecin){
                return res.status(404).json({message: 'Utilisateur non trouvé'})
            }

            const horaires = await Disponibilite.getHoraireById(id)
            if(!horaires){
                return res.status(404).json({message: 'Planning non trouvé'})
            }

            const rows = await Disponibilite.getMedecinAssocier(medecin.id, id)
            if(!rows){
                return res.status(401).json({message: 'Medecin non approprié à la mise à jour'})
            }

            await Disponibilite.supprimerHoraire(id)

            return res.status(200).json({
                success: true,
                message: 'Suppression du plaaning réussi'
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


module.exports = HoraireController;