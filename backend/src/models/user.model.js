
const pool = require('../database/db')

const UserModel = {

    getEmail : (async (email) => {
        const [[user]] = await pool.query(
            'SELECT id, email, est_creer, password, est_actif, est_verifie FROM users WHERE email = ?',[email]
        )

        return user
    }),

    getUserById : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT id, photo_profil, email, est_actif, fullName, telephone, otp, otp_expire FROM users WHERE id = ?',[id]
        )

        return user
    }),

    getAllUserNoAdmin : (async (id, limit, offset) => {
         const [user] = await pool.query(
            'SELECT id, fullName, email, telephone, est_actif, created_at FROM users WHERE id != ? ORDER BY created_at DESC LIMIT ? OFFSET ?', [id, limit, offset]
        )

        return user
    }),

    getTotalPatient : (async (id) => {
        const [[total]] = await pool.query(
            'SELECT COUNT(id) AS total_patients FROM patients'
        )

        return total
    }),

    getInfoMedecin : (async () => {
        const [medecin] = await pool.query(
            `SELECT 
                u.id, u.fullName, u.email, u.est_actif, u.created_at, 
                m.a_propos, m.formation, 
                s.nom AS specialite
            FROM medecins m
            INNER JOIN users u ON u.id = m.userId
            INNER JOIN specialites s ON s.id = m.specialiteId`,
        )

        return medecin
    }),

    getMedecin : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT userId, id FROM medecins WHERE id = ?', [id]
        )

        return user
    }),

    getPatient : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT userId, id FROM patients WHERE id = ?', [id]
        )

        return user
    }),

    getPatientById : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT id FROM patients WHERE userId = ?', [id]
        )

        return user
    }),

    getMedecinById : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT id FROM medecins WHERE userId = ?', [id]
        )

        return user
    }),

    getAdminById : (async (id) => {
        const [[user]] = await pool.query(
            'SELECT id FROM admins WHERE userId = ?', [id]
        )

        return user
    }),

    ajouterUser: (async (fullName, email, password) => {
        const [result] = await pool.query(
            'INSERT INTO users (fullName, email, password, est_verifie, est_creer) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, password, true, true ]
        )

        return result
    }),

    ajouterMedecin : (async (userId, specialiteId) => {
        await pool.query(
            'INSERT INTO medecins (userId, specialiteId) VALUES (?, ?)',[userId, specialiteId]
        )
    }),

    ajouterPatient : (async (id) => {
        await pool.query(
            'INSERT INTO patients(userId) VALUES (?)', [id]
        )
    }),

    supprimerUserByEmail : (async (email) => {
        await pool.query(
            'DELETE FROM users WHERE email = ?',[email]
        )
    }),

    creerCompte : (async (fullName, email, password, telephone, otp, otpExpire) => {
        const [result] = await pool.query(
            'INSERT INTO users (fullName, email, password, telephone, otp, otp_expire) VALUES (?, ?, ?, ?, ?, ?)',
            [fullName, email, password, telephone, otp, otpExpire ]
        )

        return result
    }),

    updateAfterVerify : (async (creer, verifier, id) => {
        await pool.query(
            'UPDATE users SET est_creer = ?, est_verifie = ? WHERE id = ?',
            [creer, verifier, id]
        )
    }),

    updatePassword: (async (password, id) => {
        await pool.query(
            'UPDATE users SET password = ? WHERE id = ?', [password, id]
        )
    }),
}

module.exports = UserModel;
