
const pool = require('../database/db')

const SpecialiteModel = {

    getAllSpecialite : (async (limit, offset) => {
        const [specialite] = await pool.query(
            `SELECT 
                id, nom, description, 
                created_at 
            FROM specialites 
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?`,[limit, offset]
        )

        return specialite
    }), 
    
    getSpecialiteById : (async (id) => {
        const [[specialite]] = await pool.query(
            'SELECT id, nom FROM specialites WHERE id = ?',[id]
        )

        return specialite
    }),

    getSpecialiteByNom : (async (nom) => {
        const [[specialite]] = await pool.query(
            'SELECT id FROM specialites WHERE nom = ?',[nom]
        )

        return specialite
    }),

    ajouterSpecialite : (async (nom, description) => {
        await pool.query(
            'INSERT INTO specialites (nom, description) VALUES (?, ?)', 
            [nom, description ? description : null]
        )
    }),

    modifierSpecialite : (async (nom, description, id) => {
        await pool.query(
            'UPDATE specialites set nom = ?, description = ? WHERE id = ?', 
            [nom, description ? description : null, id]
        )
    }),

    supprimerSpecialite : (async (id) => {
        await pool.query(
            'DELETE FROM specialites WHERE id = ?',[id]
        )
    }),

    desactiverUserAvecSpecialite : (async (id) => {
        await pool.query(
            `UPDATE users u
            INNER JOIN medecins m ON m.userId = u.id
            SET u.est_actif = false
            WHERE m.specialiteId = ?`,[id]
        )
    }),

    getSpecialiteAvecNbrMedecin : (async (date, limit, offset) => {
        const [specialites] = await pool.query(`
                SELECT 
                    s.id,
                    s.nom,
                    s.description,
                    s.created_at,
                    COUNT(DISTINCT CASE WHEN d.date = ? THEN m.id END) AS total_medecins
                FROM specialites s
                LEFT JOIN medecins m ON m.specialiteId = s.id
                LEFT JOIN disponibilites d ON d.medecinId = m.id
                GROUP BY s.id, s.nom, s.description, s.created_at
                ORDER BY s.created_at DESC
                LIMIT ? OFFSET ?
             `, [date, limit, offset]
            );

        return specialites
    }),

    getAllMedecinAvecSpecialite : (async (date, limit, offset) => {
        const [medecins] = await pool.query(`
            SELECT 
                u.id,
                u.fullName,
                u.photo_profil,
                s.nom AS specialite,
                m.id AS medecinId,
                m.a_propos,
                m.formation,
                d.date,
                GROUP_CONCAT(d.heures ORDER BY d.heures) AS heures
            FROM medecins m
            INNER JOIN users u ON u.id = m.userId
            INNER JOIN specialites s ON s.id = m.specialiteId
            INNER JOIN disponibilites d ON d.medecinId = m.id
            WHERE d.date = ?
            GROUP BY m.id, d.date
            ORDER BY u.created_at DESC
            LIMIT ? OFFSET ?
        `, [date, limit, offset])

        return medecins
    }),

    getAllMedecinOfSpecialite : (async (limit, offset, id, date) => {
        const [medecins] = await pool.query(`
            SELECT 
                u.id,
                u.fullName,
                u.photo_profil,
                s.nom AS specialite,
                m.a_propos,
                m.formation,
                d.date,
                GROUP_CONCAT(d.heures ORDER BY d.heures) AS heures
            FROM medecins m
            INNER JOIN users u ON u.id = m.userId
            INNER JOIN specialites s ON s.id = m.specialiteId
            INNER JOIN disponibilites d ON d.medecinId = m.id
            WHERE s.id = ? AND d.date = ?
            GROUP BY m.id, d.date
            ORDER BY u.created_at DESC
            LIMIT ? OFFSET ?
        `, [id, date, limit, offset])

        return medecins
    }),
    
}


module.exports = SpecialiteModel;