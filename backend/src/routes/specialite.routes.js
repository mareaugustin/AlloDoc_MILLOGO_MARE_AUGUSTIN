
const router = require('express').Router()
const SpecialiteController = require('../controllers/specialite.controller')
const {ajoutValidate} = require('../middlewares/specialite.middleware')
const {checkAccount, checkAuth, checkAdmin, checkPatient} = require('../middlewares/auth.middleware')


router.post('/ajouter', checkAuth, checkAdmin, checkAccount, ajoutValidate, SpecialiteController.ajouter)
router.put('/modifier/:id', checkAuth, checkAdmin, checkAccount, ajoutValidate, SpecialiteController.modifier)
router.get('/listes', checkAuth, checkAccount, checkAdmin, SpecialiteController.LesSpecialites)
router.get('/listes-avec-medecins', checkAuth, checkPatient, checkAccount, SpecialiteController.SpecialitesAvecMedecin)
router.get('/medecin-specialite', checkAuth, checkPatient, checkAccount, SpecialiteController.TousLesMedecinsAvecLeurSpecialite)
router.get('/specialite/:id/medecin', checkAuth, checkPatient, checkAccount, SpecialiteController.TousMedecinsForSpecialite)
router.delete('/supprimer/:id', checkAuth, checkAdmin, checkAccount, SpecialiteController.supprimer)

module.exports = router;