import { Request, Response } from "express";
import * as livreService from "../services/livreService";

export const createLivre = async (req: Request, res: Response) => {
  try {
    const livre = await livreService.ajouterLivre(req.body);

    res.status(201).json({
      success: true,
      message: "Livre ajouté avec succès",
      data: livre
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllLivres = async (req: Request, res: Response) => {
  const livres = await livreService.afficherLivres();

  res.status(200).json({
    success: true,
    data: livres
  });
};

export const getLivreById = async (req: Request, res: Response) => {
  const livre = await livreService.trouverLivre(req.params.id);

  if (!livre) {
    return res.status(404).json({
      success: false,
      message: "Livre introuvable"
    });
  }

  res.status(200).json({
    success: true,
    data: livre
  });
};

export const updateLivre = async (req: Request, res: Response) => {
  const livre = await livreService.modifierLivre(req.params.id, req.body);

  if (!livre) {
    return res.status(404).json({
      success: false,
      message: "Livre introuvable"
    });
  }

  res.status(200).json({
    success: true,
    message: "Livre modifié",
    data: livre
  });
};

export const deleteLivre = async (req: Request, res: Response) => {
  const livre = await livreService.supprimerLivre(req.params.id);

  if (!livre) {
    return res.status(404).json({
      success: false,
      message: "Livre introuvable"
    });
  }

  res.status(200).json({
    success: true,
    message: "Livre supprimé"
  });
};