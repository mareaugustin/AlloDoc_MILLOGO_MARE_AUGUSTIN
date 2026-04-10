
const pool = require('../database/db')

const RendezVousModel = {

    getPatientById : (async (id) => {
        const [[patient]] = await pool.query(
            'SELECT id FROM patients WHERE userId = ?',[id]
        )

        return patient
    }),

    getRendezvousById : (async (id) => {
        const [[rendez_vous]] = await pool.query(
            'SELECT id, medecinId, patientId, date, heures FROM rendezVous WHERE id = ?',[id]
        )

        return rendez_vous
    }),

    getRendezvousPatient : (async (id) => {
        const [[rendez_vous]] = await pool.query(
            'SELECT id, medecinId, date, heures FROM rendezVous WHERE patientId = ?',[id]
        )

        return rendez_vous
    }),

    getPatientDuRdv : (async (id, patientId) => {
        const [[rendez_vous]] = await pool.query(
            'SELECT id, medecinId FROM rendezVous WHERE id = ? AND patientId = ?',[id, patientId]
        )

        return rendez_vous
    }),


    getAllRendezvous : (async (id) => {
        const [rendez_vous] = await pool.query(
            `SELECT 
                r.id,
                r.date,
                r.heures,
                r.statut,
                r.est_passer,
                r.medecinId,
                r.patientId,
                r.created_at,
                s.nom AS specialite,
                u.fullName
            FROM rendezVous r
            INNER JOIN medecins m ON m.id = r.medecinId
            INNER JOIN specialites s ON s.id = m.specialiteId
            INNER JOIN users u ON u.id = m.userId
            WHERE r.patientId = ?
            ORDER BY r.created_at DESC`,[id]
            // 'SELECT * FROM rendezVous WHERE patientId = ? ORDER BY created_at DESC',[id]
        )

        return rendez_vous
    }),

    getStatutRendezvous : ( async (statut, id) => {
        const [statut_rdv] = await pool.query(
            'SELECT * FROM rendezVous WHERE statut = ? AND patientId = ? ORDER BY created_at DESC',[statut, id]
        )

        return statut_rdv
    }),

    getRendezvousPasser : ( async (id) => {
        const [rdv_passer] = await pool.query(
            'SELECT * FROM rendezVous WHERE est_passer = ? AND patientId = ? ORDER BY created_at DESC',[true, id]
        )

        return rdv_passer
    }),

    updateStatutRendezvous : ( async (statut, id) => {
        await pool.query(
            'UPDATE rendezVous SET statut = ? WHERE id = ?', [statut, id]
        )
    }),

    updateStatut : ( async (statut, motif, id) => {
        await pool.query(
            'UPDATE rendezVous SET statut = ?, motif = ? WHERE id = ?', [statut, motif ? motif : null, id]
        )
    }),

     ajouterRendezvous : ( async (date, heures, patientId, medecinId) => {
        await pool.query(
            'INSERT INTO rendezVous (date, heures, patientId, medecinId) VALUES (?, ?, ?, ?)',
            [date, heures, patientId, medecinId]
        )
    }),

    supprimerRendezvous : ( async (id) => {
        await pool.query(
            'DELETE FROM rendezVous WHERE id = ?',[id]
        )
    }),

    supprimerTousRendezvous : ( async (id) => {
        await pool.query(
            'DELETE FROM rendezVous WHERE patientId = ?',[id]
        )
    }),
    
}


module.exports = RendezVousModel;