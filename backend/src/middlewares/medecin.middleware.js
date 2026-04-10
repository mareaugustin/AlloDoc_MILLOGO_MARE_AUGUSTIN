

function modifInfoMedecinValidate (req, res, next) {
  const {fullName, a_propos, formation} = req.body
  let errors = []

  if(!fullName.trim() || fullName.length < 1 ){
    errors.push('Nom invalid')
  }

  if(a_propos && !a_propos.trim()){
    errors.push('Entré invalid')
  }

  if(formation && !formation.trim()){
    errors.push('Entré invalid')
  }

  if(errors.length > 0){
    res.status(500).json({
      message: errors
    })
  }

  next()
}


module.exports = {modifInfoMedecinValidate}