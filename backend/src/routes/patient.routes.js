
const router = require('express').Router()
const PatientController = require('../controllers/patient.controller')
const {checkAccount, checkAuth, checkPatient} = require('../middlewares/auth.middleware')
const {modifInfoPatientValidate} = require('../middlewares/patient.middleware')


router.get('/infos', checkAuth, checkAccount, checkPatient, PatientController.getInfo)
router.put('/modifier-infos', checkAuth, checkAccount, checkPatient, modifInfoPatientValidate, PatientController.ModifierInfo)


module.exports = router;
