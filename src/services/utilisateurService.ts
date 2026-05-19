import Utilisateur from "../models/Utilisateur";
import jwt from "jsonwebtoken";

// Génération JWT
const genererToken = (id: string) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );
};

// Inscription
export const inscrireUtilisateur =
  async (data: any) => {

    const existe =
      await Utilisateur.findOne({
        email: data.email
      });

    if (existe) {
      throw new Error(
        "Cet email existe déjà"
      );
    }

    const utilisateur =
      await Utilisateur.create(data);

    const token =
      genererToken(
        utilisateur._id.toString()
      );

    return {
      utilisateur,
      token
    };
  };

// Connexion
export const connecterUtilisateur =
  async (
    email: string,
    motDePasse: string
  ) => {

    const utilisateur =
      await Utilisateur.findOne({
        email
      }).select("+motDePasse");

    if (!utilisateur) {
      throw new Error(
        "Email incorrect"
      );
    }

    const valide =
      await utilisateur
        .comparerMotDePasse(
          motDePasse
        );

    if (!valide) {
      throw new Error(
        "Mot de passe incorrect"
      );
    }

    const token =
      genererToken(
        utilisateur._id.toString()
      );

    return {
      utilisateur,
      token
    };
  };

// Liste utilisateurs
export const afficherUtilisateurs =
  async () => {

    return Utilisateur.find();
  };