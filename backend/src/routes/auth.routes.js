
const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const {checkOtp, checkAccount, checkAuth, otpValidate, passwordValidate, connexionValidate, inscriptionValidate} = require('../middlewares/auth.middleware')

router.post('/inscription', inscriptionValidate, AuthController.inscription)
router.post('/verifier-email',checkOtp, otpValidate, AuthController.veriferEmail)
router.post('/connexion', connexionValidate, AuthController.connexion)
router.post('/reset-password', connexionValidate, AuthController.resetPassword)
router.put('/modifier-password', checkAuth, checkAccount, passwordValidate, AuthController.modifierPassword)


module.exports = router;
