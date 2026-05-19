import mongoose, { Document, Schema } from "mongoose";

export interface ILivre extends Document {
  titre: string;
  auteur: mongoose.Types.ObjectId;
  isbn: string;
  categorie: string;
  anneeEdition: number;
  disponible: boolean;
}

const LivreSchema = new Schema<ILivre>(
  {
    titre: {
      type: String,
      required: [true, "Le titre est obligatoire"],
      trim: true
    },
    auteur: {
      type: Schema.Types.ObjectId,
      ref: "Auteur",
      required: [true, "L'auteur est obligatoire"]
    },
    isbn: {
      type: String,
      required: [true, "L'ISBN est obligatoire"],
      unique: true,
      trim: true
    },
    categorie: {
      type: String,
      enum: ["Roman", "Science", "Histoire", "Informatique", "Philosophie", "Autre"],
      default: "Autre"
    },
    anneeEdition: {
      type: Number,
      required: true
    },
    disponible: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ILivre>("Livre", LivreSchema);