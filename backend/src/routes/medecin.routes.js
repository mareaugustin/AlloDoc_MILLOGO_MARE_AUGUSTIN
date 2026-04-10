
const router = require('express').Router()
const MedecinController = require('../controllers/medecin.controller')
const {checkAccount, checkAuth, checkMedecin} = require('../middlewares/auth.middleware')
const {modifInfoMedecinValidate} = require('../middlewares/medecin.middleware')


router.get('/stats-rdv', checkAuth, checkMedecin, checkAccount, MedecinController.obtenirTotalRdv)
router.get('/infos-patient-rdv', checkAuth, checkMedecin, checkAccount, MedecinController.InfoRdv)
router.get('/horaires', checkAuth, checkMedecin, checkAccount, MedecinController.mesHoraires)
router.get('/infos', checkAuth, checkMedecin, checkAccount, MedecinController.mesInfos)
router.put('/modifier/infos', checkAuth, checkMedecin, checkAccount, modifInfoMedecinValidate, MedecinController.ModifierInfo)

module.exports = router;