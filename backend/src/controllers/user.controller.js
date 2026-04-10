
// const mail = require('../utils/mail.utils')
// const bcrypt = require('bcryptjs')
// const User = require('../models/user.model')
// const Specialite = require('../models/specialite.model')

// const UserController = {

//     compteMedecin : (async (req, res) => {
//         try {
//             const {fullName, email, password, specialiteId} = req.body

//             const userExiste = await User.getEmail(email)
//             if(userExiste) {
//                 return res.status(400).json({message: 'Ce compte existe déjà'})
//             }

//             const specialiteExiste = await Specialite.getSpecialiteById(specialiteId)
//             if(!specialiteExiste) {
//                 return res.status(400).json({message: 'Spécialité non trouvée'})
//             }

//             const hashPassword = await bcrypt.hash(password, 10);

//             const result = await User.ajouterUser(fullName, email, hashPassword)

//             await User.ajouterMedecin(result.insertId, specialiteId)

//             mail(email, 'AlloDoc - Crétaion de compte',
//                 `<h2>Votre compte a été créé avec succès. Vos identifiants sont les suivants:</h2>
//                 <h3>email : ${email}</h3>
//                 <h3>mot de passe : ${password}</h3>
//                 <p>Vous pouvez à tout moment modifier votre mot de passe une fois connecté.</p>`
//             )

//             return res.status(201).json({
//                 success: true,
//                 message: 'Compte médécin créé'
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 success: false,
//                 erreur: 'Erreur interne serveur',
//                 message: error.message
//             })
//         }
//     }),



//     modifyUser : (async (req, res) => {

//     }),

//     deleteUser : (async (req, res) => {

//     }),

//     desactiverCompte : (async (req, res) => {

//     })
// }


// module.exports = UserController;