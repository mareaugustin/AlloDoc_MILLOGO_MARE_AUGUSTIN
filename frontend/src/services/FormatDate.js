

export function FormatDate(date){
    if(!date) return
    const dateFormat = new Date(date).toLocaleDateString('fr-FR')
    
    return dateFormat
}

export function FormatDateIso(date){
    if(!date) return
    const dateFormat = new Date(date).toISOString().split('T')[0]
    
    return dateFormat
}


