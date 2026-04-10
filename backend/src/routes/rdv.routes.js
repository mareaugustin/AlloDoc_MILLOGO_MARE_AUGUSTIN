
const router = require('express').Router()
const RendezVousController = require('../controllers/rdv.controller')
const {checkAccount, checkAuth, checkPatient} = require('../middlewares/auth.middleware')
const {rendezVousValidate} = require('../middlewares/rdv.middleware')

router.get('/mes-rendez-vous', checkAuth, checkAccount, checkPatient, RendezVousController.mesRendezVous)
router.post('/prendre', checkAuth, checkAccount, checkPatient, rendezVousValidate, RendezVousController.prendreRendezVous)
router.put('/annuler/:id', checkAuth, checkAccount, checkPatient, RendezVousController.annulerRendezVous)
router.delete('/supprimer/:id', checkAuth, checkAccount, checkPatient, RendezVousController.supprimerRendezVous)
router.delete('/supprimer-tout', checkAuth, checkAccount, checkPatient, RendezVousController.deleteAllRendezVous)


module.exports = router;
