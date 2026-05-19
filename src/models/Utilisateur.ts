import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUtilisateur extends Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: "lecteur" | "bibliothecaire" | "admin";

  comparerMotDePasse(
    motDePasse: string
  ): Promise<boolean>;
}

const UtilisateurSchema =
  new Schema<IUtilisateur>(
    {
      nom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
      },

      prenom: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },

      motDePasse: {
        type: String,
        required: true,
        minlength: 6,
        select: false
      },

      role: {
        type: String,
        enum: [
          "lecteur",
          "bibliothecaire",
          "admin"
        ],
        default: "lecteur"
      }
    },
    {
      timestamps: true
    }
  );

// Hash du mot de passe avant sauvegarde
UtilisateurSchema.pre(
  "save",
  async function (next) {

    if (!this.isModified("motDePasse")) {
      return next();
    }

    const salt =
      await bcrypt.genSalt(10);

    this.motDePasse =
      await bcrypt.hash(
        this.motDePasse,
        salt
      );

    next();
  }
);

// Vérification mot de passe
UtilisateurSchema.methods
  .comparerMotDePasse =
  async function (
    motDePasse: string
  ): Promise<boolean> {

    return bcrypt.compare(
      motDePasse,
      this.motDePasse
    );
  };

export default mongoose.model<IUtilisateur>(
  "Utilisateur",
  UtilisateurSchema
);