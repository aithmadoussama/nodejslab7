# 📘 API de Gestion de Bibliothèque

Application backend développée avec Node.js, Express et MongoDB permettant la gestion des ouvrages, des auteurs et des emprunts dans une bibliothèque.

## 🛠️ Outils et technologies
Node.js
Express.js
TypeScript
MongoDB
Mongoose
Joi Validation
JSON Web Token (JWT)
Swagger UI
Jest
Supertest

## 📂 Organisation du projet
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
│   └── api/
├── services/
├── validators/
├── helpers/
├── app.ts
└── server.ts


## 🔧 Mise en place du projet
Étape 1 : Récupération du projet
git clone <adresse-du-repository>
cd gestion-biblio-api
Étape 2 : Installation des packages
npm install
Étape 3 : Création du fichier d’environnement

Créer un fichier .env à la racine du projet :

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/gestion_bibliotheque
NODE_ENV=development

## ▶️ Exécution de l’application
Démarrage en mode développement
npm run dev
Compilation TypeScript
npm run build
Lancement après compilation
npm start


## 📡 Endpoints disponibles
Méthode	URL
GET	/api/v1/authors
POST	/api/v1/authors
GET	/api/v1/books
POST	/api/v1/books
GET	/api/v1/loans
POST	/api/v1/loans
POST	/api/v1/users/signup
POST	/api/v1/users/signin

## 📚 Documentation de l’API

Swagger est disponible à l’adresse suivante :

http://localhost:3000/api-docs


## ✅ Exécution des tests

Pour lancer les tests automatisés :

npm run test
🎯 Fonctionnalités principales
Gestion des livres
Gestion des auteurs
Gestion des utilisateurs
Authentification sécurisée avec JWT
Validation des données
Documentation interactive avec Swagger
Architecture RESTful


## 📌 Aperçu du fonctionnement

Le projet expose une API REST permettant aux utilisateurs d’effectuer différentes opérations CRUD sur les ressources de la bibliothèque à travers des requêtes HTTP.

👨‍🎓 Réalisation

AIT HMAD OUSSAMA