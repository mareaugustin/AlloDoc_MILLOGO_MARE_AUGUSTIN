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
│   ├── logs/            # Pour la traçabilité des requetes
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
