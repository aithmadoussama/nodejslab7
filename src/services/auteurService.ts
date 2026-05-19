import Auteur, { IAuteur } from "../models/Auteur";
import mongoose from "mongoose";

interface AuteurQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}

export const ajouterAuteur = async (data: Partial<IAuteur>) => {
  return Auteur.create(data);
};

export const afficherAuteurs = async (query: AuteurQuery) => {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const filter: any = {};

  if (query.search) {
    filter.$or = [
      { nom: { $regex: query.search, $options: "i" } },
      { prenom: { $regex: query.search, $options: "i" } }
    ];
  }

  const sortOption: any = query.sort
    ? { [query.sort.replace("-", "")]: query.sort.startsWith("-") ? -1 : 1 }
    : { createdAt: -1 };

  const auteurs = await Auteur.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  const total = await Auteur.countDocuments(filter);

  return {
    auteurs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export const trouverAuteur = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Auteur.findById(id);
};

export const modifierAuteur = async (id: string, data: Partial<IAuteur>) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  return Auteur.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const supprimerAuteur = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Auteur.findByIdAndDelete(id);
};