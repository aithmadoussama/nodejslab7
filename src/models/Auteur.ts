import mongoose, { Document, Schema } from "mongoose";

export interface IAuteur extends Document {
  nom: string;
  prenom: string;
  nationalite?: string;
  dateNaissance: Date;
  description?: string;
}

const AuteurSchema = new Schema<IAuteur>(
  {
    nom: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
      maxlength: 60
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est obligatoire"],
      trim: true,
      maxlength: 60
    },
    nationalite: {
      type: String,
      trim: true,
      default: "Non précisée"
    },
    dateNaissance: {
      type: Date,
      required: [true, "La date de naissance est obligatoire"]
    },
    description: {
      type: String,
      maxlength: 1000
    }
  },
  {
    timestamps: true
  }
);

AuteurSchema.index({ nom: 1, prenom: 1 });

export default mongoose.model<IAuteur>("Auteur", AuteurSchema);