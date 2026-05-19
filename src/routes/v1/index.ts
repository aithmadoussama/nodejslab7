import express from "express";

import auteurRoutes from "./auteurRoutes";
import livreRoutes from "./livreRoutes";
import empruntRoutes from "./empruntRoutes";
import utilisateurRoutes
from "./utilisateurRoutes";
const router = express.Router();

// Routes auteurs
router.use("/auteurs", auteurRoutes);

// Routes livres
router.use("/livres", livreRoutes);

// Routes emprunts
router.use("/emprunts", empruntRoutes);
router.use(
  "/utilisateurs",
  utilisateurRoutes
);
export default router;
