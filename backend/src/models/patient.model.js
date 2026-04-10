const pool = require('../database/db')

const PatientModel = {
    getUserInfo : (async (id) => {
        const [[user]] = await pool.query(
            `SELECT
                u.id,
                u.fullName,
                u.email,
                u.photo_profil,
                u.telephone,
                u.created_at
            FROM users u
            WHERE u.id = ? 
            `,[id]
        )

        return user
    }),

    saveInfo : (async (fullName, email, telephone, id) => {
        await pool.query(
            'UPDATE users SET fullName = ?, email = ?, telephone = ? WHERE id = ?',[fullName, email, telephone, id]
        )
    })
}

module.exports = PatientModel;