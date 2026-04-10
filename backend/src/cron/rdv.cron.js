const cron = require('node-cron');
const pool = require('../database/db')

const startRendezvousCron = () => {
    cron.schedule('* * * * *', async () => {

        try {
            await pool.query(
                'UPDATE rendezVous SET est_passer = true WHERE date < CURDATE() AND est_passer = false'
            );
        } catch (err) {
            console.error('Erreur cron:', err);
        }
    });
};

module.exports = startRendezvousCron;