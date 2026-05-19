import Livre from "../models/Livre";
import mongoose from "mongoose";

export const ajouterLivre = async (data: any) => {
  return Livre.create(data);
};

export const afficherLivres = async () => {
  return Livre.find().populate("auteur");
};

export const trouverLivre = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Livre.findById(id).populate("auteur");
};

export const modifierLivre = async (id: string, data: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  return Livre.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const supprimerLivre = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Livre.findByIdAndDelete(id);
};