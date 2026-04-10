
const router = require('express').Router()
const AdminController = require('../controllers/admin.controller')
const {checkAdmin, checkAccount, checkAuth, createUserValidate} = require('../middlewares/auth.middleware')


router.post('/creer-compte', checkAuth, checkAccount, checkAdmin, createUserValidate, AdminController.creerMedecin)
router.get('/stats',checkAuth,  checkAccount, checkAdmin, AdminController.obgetenirLesStats)
router.get('/specialites/tous',checkAuth,  checkAccount, checkAdmin, AdminController.obtenirToutesLesSpecialites)
router.get('/specialites/affectation',checkAuth,  checkAccount, checkAdmin, AdminController.ToutesLesSpecialites)
router.get('/rdv',checkAuth,  checkAccount, checkAdmin, AdminController.getAllRdv)
router.put('/annuler/:id',checkAuth,  checkAccount, checkAdmin, AdminController.annulerRendezVous)
router.get('/user',checkAuth,  checkAccount, checkAdmin, AdminController.getAllUser)
router.put('/user/:id',checkAuth,  checkAccount, checkAdmin, AdminController.changerStatutCompte)
router.get('/user-medecin',checkAuth,  checkAccount, checkAdmin, AdminController.getMedecins)


module.exports = router;
