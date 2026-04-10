

function FormatDate(date){
    if(!date) return
    const dateFormat = new Date(date).toLocaleDateString('fr-FR')
    return dateFormat
}

module.exports = FormatDate;