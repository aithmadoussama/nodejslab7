import { Request, Response } from "express";
import * as empruntService from "../services/empruntService";

export const createEmprunt = async (req: Request, res: Response) => {
  const emprunt = await empruntService.ajouterEmprunt(req.body);

  res.status(201).json({
    success: true,
    message: "Emprunt ajouté avec succès",
    data: emprunt
  });
};

export const getAllEmprunts = async (req: Request, res: Response) => {
  const emprunts = await empruntService.afficherEmprunts();

  res.status(200).json({
    success: true,
    data: emprunts
  });
};

export const getEmpruntById = async (req: Request, res: Response) => {
  const emprunt = await empruntService.trouverEmprunt(req.params.id);

  if (!emprunt) {
    return res.status(404).json({
      success: false,
      message: "Emprunt introuvable"
    });
  }

  res.status(200).json({
    success: true,
    data: emprunt
  });
};

export const updateEmprunt = async (req: Request, res: Response) => {
  const emprunt = await empruntService.modifierEmprunt(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Emprunt modifié",
    data: emprunt
  });
};

export const deleteEmprunt = async (req: Request, res: Response) => {
  await empruntService.supprimerEmprunt(req.params.id);

  res.status(200).json({
    success: true,
    message: "Emprunt supprimé"
  });
};