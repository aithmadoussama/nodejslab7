import mongoose, { Document, Schema } from "mongoose";

export interface IEmprunt extends Document {
  livre: mongoose.Types.ObjectId;
  lecteur: string;
  dateEmprunt: Date;
  dateRetourPrevue: Date;
  statut: "en_cours" | "retourne" | "retard";
}

const EmpruntSchema = new Schema<IEmprunt>(
  {
    livre: {
      type: Schema.Types.ObjectId,
      ref: "Livre",
      required: true
    },
    lecteur: {
      type: String,
      required: true,
      trim: true
    },
    dateEmprunt: {
      type: Date,
      default: Date.now
    },
    dateRetourPrevue: {
      type: Date,
      required: true
    },
    statut: {
      type: String,
      enum: ["en_cours", "retourne", "retard"],
      default: "en_cours"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IEmprunt>("Emprunt", EmpruntSchema);