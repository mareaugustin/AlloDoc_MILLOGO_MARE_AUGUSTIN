# AlloDoc

#### GUIDE D'INSTALLATION

### cloner le repo
```
git clone https://github.com/mareaugustin/AlloDoc
```

### Backend:
#### Naviguer vers le dossier backend
```
cd backend
```


#### Installer les dépendances
```
npm install
```

#### Créer et configurer le fichier .env (voir section Configuration)
```
cp .env.example .env
```

#### Créer la base de données
```
voir le fichier db.sql
```

#### Créer l'admin par défaut
```
npm run seed
```

#### Lancer le serveur en mode développement
```
npm run dev
```


### FRONTEND - MOBILE
#### Naviguer vers le dossier frontend
```
cd frontend
```

#### Installer les dépendances
```
npm install
```

#### Lancer le serveur metro
```
npm start
```

#### Dans un autre terminal, lancer Android
```
npm run android
```


#### FAITE REFERENCES AU .env.example pour la
#### creation du DB et laisser la configuration du #### mail par defaut pour utisation


#### ARCHITECTURE BACKEND
```
backend/
├── src/
│   ├── controllers/      # Logique métier des routes
│   ├── cron/            # Tâches planifiées pour mettre à jour les rdv passés
│   ├── database/        # Configuration et connexion DB
│   ├── middlewares/     # Middlewares (auth, validation)
│   ├── models/          # Modèles de données (communication avec la base de données)
│   ├── routes/          # Définition des routes API
│   ├── seeders/         # Scripts de création de l'admin
│   ├── utils/           # Fonctions utilitaires (envoie de mail et le formatage de date)
│   └── app.js           # Configuration Express
├── server.js            # Point d'entrée du serveur
├── .env.example         # Template des variables d'environnement
└── package.json
```


#### ARCHITECTURE MOBILE FRONTEND
```
frontend/
├── src/
│   ├── assets/          # Images, fonts, icônes
│   ├── components/      
│   │   ├── commons/     # Composants réutilisables
│   │   └── specifics/   # Composants spécifiques
│   ├── ecrans/          # Écrans de l'application
│   ├── hooks/           # Hooks personnalisés pour les appels API
│   ├── services/        # Services
│   ├── tabs/            # Navigation par onglets
│   └── vues/            # Vues mobile utilisateur
├── App.tsx              # Composant racine
└── package.json
```


## Documentation API

## Base URL
```
http://localhost:3000/api
```

## Table des matières
1. [Authentification](#authentification)
2. [Patient](#patient)
3. [Médecin](#médecin)
4. [Rendez-vous](#rendez-vous)
5. [Horaires](#horaires)
6. [Spécialités](#spécialités)
7. [Administration](#administration)

---

## Authentification

### Inscription Patient
**POST** `/auth/inscription`

**Body:**
```json
{
    "fullName": "",
    "email": "",
    "password": "",
    "telephone": ""
}
```

### Vérification Email
**POST** `/auth/verifier-email`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "otp": ""
}
```

### Connexion
**POST** `/auth/connexion`

**Body:**
```json
{
    "email": "",
    "password": ""
}
```

### Réinitialisation du mot de passe
**POST** `/auth/reset-password`

**Body:**
```json
{
    "email": "",
    "password": ""
}
```

### Modification du mot de passe
**PUT** `/auth/modifier-password`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "password": ""
}
```

---

## Patient

### Obtenir informations personnelles
**GET** `/patient/infos`

**Headers:**
```
Authorization: Bearer {token}
```

### Modifier informations personnelles
**PUT** `/patient/modifier-infos`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "fullName": "",
    "email": "",
    "telephone": ""
}
```

---

## Médecin

### Obtenir statistiques des rendez-vous
**GET** `/medecin/stats-rdv`

**Headers:**
```
Authorization: Bearer {token}
```

### Obtenir informations patients avec rendez-vous aujourd'hui
**GET** `/medecin/infos-patient-rdv?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Obtenir informations personnelles
**GET** `/medecin/infos`

**Headers:**
```
Authorization: Bearer {token}
```

### Modifier informations personnelles
**PUT** `/medecin/modifier/infos`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "fullName": "",
    "a_propos": "",
    "formation": ""
}
```

### Obtenir horaires du médecin
**GET** `/medecin/horaires`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Rendez-vous

### Mes rendez-vous (Patient)
**GET** `/rdv/mes-rendez-vous`

**Headers:**
```
Authorization: Bearer {token}
```

### Prendre un rendez-vous
**POST** `/rdv/prendre`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "date": "YYYY-MM-DD",
    "heures": "HH:MM",
    "medecinId": 0
}
```

### Annuler un rendez-vous (Patient)
**PUT** `/rdv/annuler/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID du rendez-vous

### Supprimer un rendez-vous (Patient)
**DELETE** `/rdv/supprimer/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID du rendez-vous

### Supprimer tous les rendez-vous (Patient)
**DELETE** `/rdv/supprimer-tout`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Horaires

### Ajouter un horaire (Médecin)
**POST** `/horaires/ajouter`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "date": "YYYY-MM-DD",
    "heures": "HH:MM"
}
```

### Lister les horaires (Médecin)
**GET** `/horaires/listes`

**Headers:**
```
Authorization: Bearer {token}
```

### Modifier un horaire (Médecin)
**PUT** `/horaires/modifier/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de l'horaire

**Body:**
```json
{
    "date": "YYYY-MM-DD",
    "heures": "HH:MM"
}
```

### Supprimer un horaire (Médecin)
**DELETE** `/horaires/delete/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de l'horaire

---

## Spécialités

### Liste des spécialités
**GET** `/specialites/listes?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Liste des spécialités avec nombre de médecins
**GET** `/specialites/listes-avec-medecins?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Liste des médecins d'une spécialité
**GET** `/specialites/specialite/{id}/medecin?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de la spécialité

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Liste des médecins avec leurs spécialités
**GET** `/specialites/medecin-specialite?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

---

## Administration

### Créer un compte médecin
**POST** `/admin/creer-compte`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "fullName": "",
    "email": "",
    "password": "",
    "specialiteId": 0
}
```

### Statistiques globales
**GET** `/admin/stats`

**Headers:**
```
Authorization: Bearer {token}
```

**Retourne:** Total users, médecins, patients, horaires, rendez-vous

### Liste des utilisateurs
**GET** `/admin/user?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Liste des médecins uniquement
**GET** `/admin/user-medecin`

**Headers:**
```
Authorization: Bearer {token}
```

### Toutes les spécialités
**GET** `/admin/specialites/tous?page={page}`

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: Numéro de la page (optionnel)

### Liste des spécialités pour affectation
**GET** `/admin/specialites/affectation`

**Headers:**
```
Authorization: Bearer {token}
```

**Note:** Sans pagination, utilisé pour l'affectation à un médecin

### Tous les rendez-vous confirmés
**GET** `/admin/rdv`

**Headers:**
```
Authorization: Bearer {token}
```

**Retourne:** Rendez-vous en cours avec informations patient et médecin

### Activer/Désactiver un compte utilisateur
**PUT** `/admin/user/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de l'utilisateur

### Annuler un rendez-vous (Admin)
**PUT** `/admin/annuler/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID du rendez-vous

**Body:**
```json
{
    "motif": ""
}
```

### Ajouter une spécialité
**POST** `/specialites/ajouter`

**Headers:**
```
Authorization: Bearer {token}
```

**Body:**
```json
{
    "nom": "",
    "description": ""
}
```

### Modifier une spécialité
**PUT** `/specialites/modifier/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de la spécialité

**Body:**
```json
{
    "nom": "",
    "description": ""
}
```

### Supprimer une spécialité
**DELETE** `/specialites/supprimer/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

**URL Parameters:**
- `id`: ID de la spécialité

---

## Notes importantes

- Tous les endpoints nécessitent un token JWT sauf les endpoints d'authentification (inscription, connexion, reset-password)
- Les tokens doivent être inclus dans le header `Authorization: Bearer {token}`
- Les dates doivent être au format `YYYY-MM-DD`
- Les heures doivent être au format `HH:MM` (24h)
- La pagination commence à la page 1