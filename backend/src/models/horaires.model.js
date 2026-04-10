

const pool = require('../database/db')

const DisponibilitesModel = {

    ajouterHoraire : (async (date, heures, id) => {
        await pool.query(
            'INSERT INTO disponibilites (date, heures, medecinId) VALUES (?, ?, ?)',[date, heures, id]
        )
    }),

    getHoraireByMedecin : (async (id) => {
         const [horaires] = await pool.query(
            'SELECT * FROM disponibilites WHERE medecinId = ? ORDER BY created_at DESC', [id]
        )
        
        return horaires
    }),

    getHoraireById : (async (id) => {
        const [[horaires]] = await pool.query(
            'SELECT id, date, heures FROM disponibilites WHERE id = ?',
            [id]
        )
        
        return horaires
    }),

    getMedecinAssocier : (async (medecinId, id) => {
       const [[horaires]] = await pool.query(
            'SELECT id FROM disponibilites WHERE medecinId = ? and id = ?',
            [medecinId, id]
        )
        
        return horaires
    }),


    modifierHoraire : (async (date, heures, id) => {
       await pool.query(
            'UPDATE disponibilites SET date = ?, heures = ? WHERE id = ?',[date, heures, id]
        )
    }),

    supprimerHoraire : (async (id) => {
       await pool.query(
            'DELETE FROM disponibilites WHERE id = ?', [id]
        )
    }),
}


module.exports = DisponibilitesModel;