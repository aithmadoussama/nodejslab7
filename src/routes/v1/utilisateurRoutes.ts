import express from "express";

import {
  register,
  login,
  getUsers
} from "../../controllers/utilisateurController";

import {
  inscriptionSchema,
  connexionSchema
} from "../../validations/utilisateurValidation";

import { validateRequest }
from "../../middlewares/validateRequest";

const router = express.Router();

// Inscription
router.post(
  "/register",

  validateRequest(
    inscriptionSchema
  ),

  register
);

// Connexion
router.post(
  "/login",

  validateRequest(
    connexionSchema
  ),

  login
);

// Liste utilisateurs
router.get(
  "/",
  getUsers
);

export default router;