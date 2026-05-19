import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

// Chargement des variables d'environnement
dotenv.config();

// Connexion MongoDB
connectDB();

// Port
const PORT = process.env.PORT || 3000;

// Lancement du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

// Gestion des erreurs non capturées
process.on("unhandledRejection", (err: any) => {
  console.error("Erreur non gérée :", err.message);

  server.close(() => {
    process.exit(1);
  });
});