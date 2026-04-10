

function modifInfoPatientValidate (req, res, next) {
  const {fullName, email, telephone} = req.body
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  let errors = []

  if(!fullName.trim() || fullName.length < 1 ){
    errors.push('Nom invalid')
  }

  if(!email.trim() || !emailRegex.test(email)){
    errors.push('Adresse email invalid')
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


module.exports = {modifInfoPatientValidate}