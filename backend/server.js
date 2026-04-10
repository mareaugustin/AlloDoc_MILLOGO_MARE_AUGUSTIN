

require('dotenv').config()
const app = require('./src/app')
const startRendezvousCron = require('./src/cron/rdv.cron')
const PORT = process.env.PORT

startRendezvousCron();

app.listen(PORT, ()=>{
    console.log('DB connecté');
    console.log(`Server demarré sur http://localhost:${PORT}`);
})