const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET_KEY_AUTH = process.env.SECRET_KEY_AUTH;
const SECRET_KEY_OTP = process.env.SECRET_KEY_OTP;
const pool = require('../database/db')

function checkAuth (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({message: 'Non authentifié'});

  try {
    req.user = jwt.verify(token, SECRET_KEY_AUTH);
    next();
  } catch (error) {
    return res.status(401).json({
        erreur: 'Non authentifié',
        message: error.message
    });
  }
};

async function checkAdmin(req, res, next) {
    try {
        const [[admin]] = await pool.query(
            'SELECT id FROM admins WHERE userId = ?',
            [req.user.id]
        )

        if (!admin) {
            return res.status(403).json({ message: 'Accès réservé aux admins' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' })
    }
}

async function checkMedecin(req, res, next) {
    try {
        const [[medecin]] = await pool.query(
            'SELECT id FROM medecins WHERE userId = ?',
            [req.user.id]
        )

        if (!medecin) {
            return res.status(403).json({ message: 'Accès réservé aux médecins' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' })
    }
}

async function checkPatient(req, res, next) {
    try {
        const [[patient]] = await pool.query(
            'SELECT id FROM patients WHERE userId = ?',
            [req.user.id]
        )

        if (!patient) {
            return res.status(403).json({ message: 'Accès réservé aux patients' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: 'Erreur serveur' })
    }
}

function checkAccount(req, res, next){
  if(!req.user.verifie || !req.user.actif){
    return res.status(401).json({message: 'Compte non verifié ou désactivé'})
  }
  next()
}

function checkOtp (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401).json({message: 'Non authentifié'});

  try {
    req.user = jwt.verify(token, SECRET_KEY_OTP);
    next();
  } catch (error) {
    res.status(401).json({
        message: 'OTP expiré'
    });
  }
};

function inscriptionValidate (req, res, next) {
  const {fullName, email, password, telephone} = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  let errors = []

  if(!fullName.trim() || fullName.length < 1 ){
    errors.push('Nom invalid')
  }

  if(!email.trim() || !emailRegex.test(email)){
    errors.push('Adresse email invalid')
  }

  if(!password.trim() || password.length < 8){
    errors.push('Mot de passe invalid')
  }

  if(!telephone.trim() || !telRegex.test(telephone)){
    errors.push('Telephone invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}

function connexionValidate (req, res, next) {
  const {email, password} = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors = []

  if(!email.trim() || !emailRegex.test(email)){
    errors.push('Adresse email invalid')
  }

  if(!password.trim() || password.length < 8){
    errors.push('Mot de passe invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}

function otpValidate (req, res, next) {
  const {otp} = req.body
  const otpRegex = /^[0-9]{6}$/;;
  let errors = []

  if(!otp.trim() || !otpRegex.test(otp)){
    errors.push('OTP invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}

function passwordValidate (req, res, next) {
  const {password} = req.body
  let errors = []

  if(!password.trim() || password.length < 8){
    errors.push('Mot de passe invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}

function createUserValidate (req, res, next) {
  const {fullName, email, password, specialiteId} = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let errors = []

  if(!specialiteId){
    errors.push('Spécialité non défini')
  }
  
  if(!fullName.trim() || fullName.length < 1 ){
    errors.push('Nom invalid')
  }

  if(!email.trim() || !emailRegex.test(email)){
    errors.push('Adresse email invalid')
  }

  if(!password.trim() || password.length < 8){
    errors.push('Mot de passe invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}


module.exports = {
  checkAuth, 
  inscriptionValidate, 
  connexionValidate, 
  otpValidate, 
  checkAccount,
  checkOtp,
  passwordValidate,
  checkAdmin,
  createUserValidate,
  checkMedecin,
  checkPatient
}