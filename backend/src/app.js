
const express = require('express')
const cors = require('cors')
const db = require('./database/db')
const app = express()

const AuthRoutes = require('./routes/auth.routes')
const RendezVousRoutes = require('./routes/rdv.routes')
const HorairesRoutes = require('./routes/horaire.routes')
const UserRoutes = require('./routes/user.routes')
const PatientRoutes = require('./routes/patient.routes')
const SpecialitesRoutes = require('./routes/specialite.routes')
const MedecinRoutes = require('./routes/medecin.routes')
const AdminRoutes = require('./routes/admin.routes')


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=>{
    try {
        req.db = db,
        next()
    } catch (error) {
        res.status(500).json({
            erreur: 'Erreur serveur',
            message: error.message
        })
    }
})

app.use('/api/auth', AuthRoutes)
app.use('/api/rdv', RendezVousRoutes)
app.use('/api/horaires', HorairesRoutes)
// app.use('/api/user', UserRoutes)
app.use('/api/specialites', SpecialitesRoutes)
app.use('/api/patient', PatientRoutes)
app.use('/api/medecin', MedecinRoutes)
app.use('/api/admin', AdminRoutes)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route non trouvée'
    });
});


module.exports = app;