import Emprunt from "../models/Emprunt";
import mongoose from "mongoose";

export const ajouterEmprunt = async (data: any) => {
  return Emprunt.create(data);
};

export const afficherEmprunts = async () => {
  return Emprunt.find().populate("livre");
};

export const trouverEmprunt = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Emprunt.findById(id).populate("livre");
};

export const modifierEmprunt = async (id: string, data: any) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  return Emprunt.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

export const supprimerEmprunt = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return Emprunt.findByIdAndDelete(id);
};