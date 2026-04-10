

function rendezVousValidate(req, res, next){
    const {date, heures, medecinId} = req.body
    let errors = []

    if(!date.trim()){
        errors.push('Date invalid')
    }

    if(!heures.trim()){
        errors.push('Heure invalid')
    }

    if(!medecinId){
        errors.push('ID invalid')
    }

    if(errors.length > 0){
        res.status(500).json({
            message: errors
        })
    }

    next()
}


module.exports = {rendezVousValidate};