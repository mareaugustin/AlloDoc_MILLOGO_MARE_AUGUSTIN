

function ajoutValidate(req, res, next){

    const {nom, description} = req.body
    let errors = []

    if(!nom.trim()){
        errors.push('Nom invalid')
    }

    if (description){
        if(!description.trim()){
            errors.push('Description invalid')
        }
    } else null
    

    if(errors.length > 0){
        return res.status(400).json({message: errors})
    }

    next()
}


module.exports = {ajoutValidate};