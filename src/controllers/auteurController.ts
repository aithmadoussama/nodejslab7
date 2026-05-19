import { Request, Response } from "express";
import * as auteurService from "../services/auteurService";

export const createAuteur = async (req: Request, res: Response) => {
  try {
    const auteur = await auteurService.ajouterAuteur(req.body);

    res.status(201).json({
      success: true,
      message: "Auteur ajouté avec succès",
      data: auteur
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllAuteurs = async (req: Request, res: Response) => {
  try {
    const result = await auteurService.afficherAuteurs({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      search: req.query.search as string,
      sort: req.query.sort as string
    });

    res.status(200).json({
      success: true,
      data: result.auteurs,
      pagination: result.pagination
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAuteurById = async (req: Request, res: Response) => {
  const auteur = await auteurService.trouverAuteur(req.params.id);

  if (!auteur) {
    return res.status(404).json({
      success: false,
      message: "Auteur introuvable"
    });
  }

  res.status(200).json({
    success: true,
    data: auteur
  });
};

export const updateAuteur = async (req: Request, res: Response) => {
  const auteur = await auteurService.modifierAuteur(req.params.id, req.body);

  if (!auteur) {
    return res.status(404).json({
      success: false,
      message: "Auteur introuvable"
    });
  }

  res.status(200).json({
    success: true,
    message: "Auteur modifié",
    data: auteur
  });
};

export const deleteAuteur = async (req: Request, res: Response) => {
  const auteur = await auteurService.supprimerAuteur(req.params.id);

  if (!auteur) {
    return res.status(404).json({
      success: false,
      message: "Auteur introuvable"
    });
  }

  res.status(200).json({
    success: true,
    message: "Auteur supprimé"
  });
};