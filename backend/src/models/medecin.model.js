const pool = require('../database/db')

const MedecinModel = {

    getTotalRdvByMedecin : (async (id) => {
        const [[total]] = await pool.query(
            `SELECT COUNT(id) AS total_rdv FROM rendezVous WHERE medecinId = ?`,[id]
        )

        return total
    }),

    getTotalRdvAujourdhui : (async (date, id) => {
        const [[total]] = await pool.query(
            `
            SELECT 
                COUNT(id) AS total_aujourdui
            FROM rendezVous
            WHERE date = ? AND medecinId = ? AND statut = 'confirmé'
            `,[date, id]
        )

        return total
    }),

    getRdvAvecInfoPatient : (async (date, id, limit, offset) => {
        const [rdv_info] = await pool.query(
            `SELECT
                u.id AS userId,
                u.fullName,
                u.telephone,
                u.email,
                u.photo_profil,
                r.id,
                r.patientId,
                r.date,
                r.heures,
                r.statut
            FROM rendezVous r
            INNER JOIN patients p ON p.id = r.patientId
            INNER JOIN users u ON u.id = p.userId
            WHERE r.medecinId = ? 
                AND r.date = ? 
                AND r.statut = 'confirmé' 
                AND r.est_passer = false
            ORDER BY r.created_at DESC
            Limit ? offset ?
            `,[id, date, limit, offset]
        )

        return rdv_info
    }),

    listeHoraire : (async (id) => {
        const [horaires] = await pool.query(
            `SELECT
                id,
                date,
                heures,
                created_at
            FROM disponibilites
            WHERE medecinId = ?
            ORDER BY created_at DESC
            `,[id]
        )

        return horaires
    }),

    getInfos : (async (id) => {
        const [[infos]] = await pool.query(
            `SELECT
                u.id,
                u.fullName,
                u.email,
                u.photo_profil,
                u.created_at,
                m.a_propos AS about,
                m.formation,
                s.nom AS specialite
            FROM users u
            INNER JOIN medecins m ON m.userId = u.id
            INNER JOIN specialites s ON s.id = m.specialiteId
            WHERE u.id = ?
            ORDER BY u.created_at DESC
            `,[id]
        )

        return infos
    }),

    saveInfo : (async (fullName, a_propos, formation, id) => {
        await pool.query(
            `UPDATE 
                users u
            JOIN medecins m ON m.userId = u.id
            SET 
                u.fullName = ?, 
                m.a_propos = ?, 
                m.formation = ? 
            WHERE u.id = ?`,
            [fullName, a_propos, formation, id]
        )
    })


}


module.exports = MedecinModel;