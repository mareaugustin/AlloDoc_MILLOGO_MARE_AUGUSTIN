
const router = require('express').Router()
const MedecinController = require('../controllers/horaire.controller')
const {checkAccount, checkAuth, checkMedecin} = require('../middlewares/auth.middleware')
const {horaireValidate} = require('../middlewares/horaire.middleware')

router.post('/ajouter', checkAuth, checkAccount, checkMedecin, horaireValidate, MedecinController.definirHoraires)
router.put('/modifier/:id', checkAuth, checkAccount, checkMedecin, horaireValidate, MedecinController.modifierHoraires)
router.get('/listes', checkAuth, checkAccount, checkMedecin, MedecinController.mesHoraires)
router.delete('/delete/:id', checkAuth, checkAccount, checkMedecin, MedecinController.supprimerHoraires)


module.exports = router;
