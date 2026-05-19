import {
  Request,
  Response
} from "express";

import * as utilisateurService
from "../services/utilisateurService";

// Inscription
export const register =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await utilisateurService
          .inscrireUtilisateur(
            req.body
          );

      res.status(201).json({
        success: true,

        message:
          "Utilisateur créé",

        token: result.token,

        data: result.utilisateur
      });

    } catch (error: any) {

      res.status(400).json({
        success: false,

        error: error.message
      });
    }
  };

// Connexion
export const login =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const result =
        await utilisateurService
          .connecterUtilisateur(
            req.body.email,
            req.body.motDePasse
          );

      res.status(200).json({
        success: true,

        message:
          "Connexion réussie",

        token: result.token,

        data: result.utilisateur
      });

    } catch (error: any) {

      res.status(401).json({
        success: false,

        error: error.message
      });
    }
  };

// Liste utilisateurs
export const getUsers =
  async (
    req: Request,
    res: Response
  ) => {

    const users =
      await utilisateurService
        .afficherUtilisateurs();

    res.status(200).json({
      success: true,
      data: users
    });
  };