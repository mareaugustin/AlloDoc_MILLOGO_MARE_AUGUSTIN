

const pool = require('../database/db')

const AdminModel = {

    gettotalUser : (async () => {
        const [[total]] = await pool.query(
            `SELECT DISTINCT 
                COUNT(id) AS total_user
            FROM users`
        )

        return total
    }),

    gettotalMedecin : (async () => {
        const [[total]] = await pool.query(
            `SELECT DISTINCT 
                COUNT(id) AS total_medecin
            FROM medecins`
        )

        return total
    }),


     gettotalPatient : (async () => {
        const [[total]] = await pool.query(
            `SELECT DISTINCT 
                COUNT(id) AS total_patient
            FROM patients`
        )

        return total
    }),


    gettotalRdv : (async () => {
        const [[total]] = await pool.query(
            `SELECT DISTINCT 
                COUNT(id) AS total_rdv
            FROM rendezVous`
        )

        return total
    }),

    gettotalSpecialite : (async () => {
        const [[total]] = await pool.query(
            `SELECT DISTINCT 
                COUNT(id) AS total_specialite
            FROM specialites`
        )

        return total
    }),

    
    getAllSpecialite : (async (limit, offset) => {
        const [specialite] = await pool.query(
            `SELECT * FROM specialites
            ORDER BY created_at LIMIT ? OFFSET ?`,
            [limit, offset]
        )
        
        return specialite
    }),

    getRdv : (async (pass, limit, offset) => {
        const [rdv] = await pool.query(
            `SELECT
                u.fullName AS patient,
                um.fullName AS medecin,
                s.nom AS specialite,
                r.id, r.date, r.heures,
                r.patientId, r.medecinId,
                r.created_at, r.statut, r.est_passer
            FROM rendezVous r
            INNER JOIN medecins m ON m.id = r.medecinId
            INNER JOIN specialites s ON s.id = m.specialiteId
            INNER JOIN patients p ON p.id = r.patientId
            INNER JOIN users u ON u.id = p.userId
            INNER JOIN users um ON um.id = m.userId
            WHERE r.statut = 'confirmé' AND r.est_passer = ?
            ORDER BY r.created_at DESC
            LIMIT ? OFFSET ?
            `,[pass, limit, offset]
        )

        return rdv
    }),

    updateCompte : (async (statut, id) => {
        await pool.query(
            `UPDATE users SET est_actif = ? WHERE id = ?`,[statut, id]
        )
    }),

    Specialite : (async () => {
        const [specialite] = await pool.query(
            `SELECT * FROM specialites
            ORDER BY created_at DESC`
        )
        
        return specialite
    }),

    getInfoMedecin : (async (limit, offset) => {
        const [medecin] = await pool.query(
            `SELECT 
                u.id, u.fullName, u.email, u.est_actif, u.created_at, 
                m.a_propos, m.formation, m.specialiteId,
                s.nom AS specialite
            FROM users u
            INNER JOIN medecins m ON m.userId = u.id
            INNER JOIN specialites s ON s.id = m.specialiteId
            ORDER BY u.created_at DESC
            LIMIT ? OFFSET ?`,[limit, offset]
        )

        return medecin
    }),
    


}


module.exports = AdminModel;