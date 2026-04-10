
require('dotenv').config()
const pool = require('../database/db')
const bcrypt = require('bcryptjs')

async function AdminSeed() {
    try {

        const fullName = process.env.ADMIN_FULLNAME
        const email = process.env.ADMIN_EMAIL
        const password = process.env.ADMIN_PASSWORD

        const [admin] = await pool.query(
            'SELECT id FROM users WHERE email = ?',[email]
        )
        
        if(admin.length > 0){
            console.log('Admin existe déjà')
            process.exit()
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const [result] = await pool.query(
            'INSERT INTO users (fullName, email, password, est_verifie, est_creer) VALUES (?, ?, ?, ?, ?)',
            [fullName, email, hashPassword, true, true]
        )

        await pool.query(
            'INSERT INTO admins (userId) VALUES (?)',[result.insertId]
        )

        console.log('Admin créé avec succès');
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

AdminSeed()