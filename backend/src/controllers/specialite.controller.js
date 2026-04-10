

const Specialite = require('../models/specialite.model')
const dateAujourdhui = new Date().toISOString().split('T')[0]

const SpecialiteController = {

    ajouter : ( async (req, res) => {
        try {
            const {nom, description} = req.body

            const specialiteExiste = await Specialite.getSpecialiteByNom(nom)
            if(specialiteExiste){
                return res.status(400).json({message: 'Spécialité déjà existante'})
            }

            await Specialite.ajouterSpecialite(nom, description)

            return res.status(201).json({
                succes: true,
                message: 'Specialite ajouté avec success'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    LesSpecialites : ( async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const specialite = await Specialite.getAllSpecialite(limit, offset)
            
            return res.status(200).json({
                succes: true,
                data: {
                    specialite : specialite,
                    page,
                    limit,
                    total: specialite.length
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

    SpecialitesAvecMedecin : ( async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const specialites = await Specialite.getSpecialiteAvecNbrMedecin(dateAujourdhui, limit, offset)
            
            return res.status(200).json({
                succes: true,
                data: {
                    specialites: specialites,
                    total: specialites.length,
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

    TousLesMedecinsAvecLeurSpecialite: (async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const rows = await Specialite.getAllMedecinAvecSpecialite(dateAujourdhui, limit, offset)
            const medecins = rows.map(m => ({
                ...m,
                heures: m.heures.split(',')
            }))
            return res.status(200).json({
                success: true,
                data:{
                    medecins: medecins,
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

    TousMedecinsForSpecialite: (async (req, res) => {
        try {
            const {id} = req.params

            const specialite = await Specialite.getSpecialiteById(id)
            if(!specialite){
                return res.status(404).json({message: 'Specialité introuvable'})
            }

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 10
            const offset = (page - 1) * limit

            const rows = await Specialite.getAllMedecinOfSpecialite(limit, offset, id, dateAujourdhui)
            const medecins = rows.map(m => ({
                ...m,
                heures: m.heures.split(',')
            }))
            return res.status(200).json({
                success: true,
                data: {
                    medecins: medecins,
                    total_medecins: medecins.length,
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

    modifier : ( async (req, res) => {
        try {
            const {id} = req.params
            const {nom, description} = req.body

            const specialite = await Specialite.getSpecialiteById(id)
            if(!specialite){
                return res.status(404).json({message: 'Specialité introuvable'})
            }

            if(nom !== specialite.nom){
                const specialiteExiste = await Specialite.getSpecialiteByNom(nom)
                if(specialiteExiste){
                    return res.status(400).json({message: 'Spécialité déjà existante'})
                }
            }

            await Specialite.modifierSpecialite(nom, description, id)

            return res.status(201).json({
                succes: true,
                message: 'Specialite modifié avec success'
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
    }),

    supprimer : ( async (req, res) => {
        try {
            const {id} = req.params

            const specialite = await Specialite.getSpecialiteById(id)
            if(!specialite){
                return res.status(404).json({message: 'Specialité introuvable'})
            }

            await Specialite.desactiverUserAvecSpecialite(id)

            await Specialite.supprimerSpecialite(id)

            return res.status(200).json({
                succes: true,
                message: "Specialite supprimé avec success"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                erreur: 'Erreur interne serveur',
                message: error.message
            })
        }
        
    }),

    supprimerTout : ( async (req, res) => {

    })
}


module.exports = SpecialiteController;