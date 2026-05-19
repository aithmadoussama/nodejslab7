import Joi from "joi";

export const inscriptionSchema =
  Joi.object({

    nom: Joi.string()
      .trim()
      .required(),

    prenom: Joi.string()
      .trim()
      .required(),

    email: Joi.string()
      .email()
      .required(),

    motDePasse: Joi.string()
      .min(6)
      .required(),

    role: Joi.string()
      .valid(
        "lecteur",
        "bibliothecaire",
        "admin"
      )
  });

export const connexionSchema =
  Joi.object({

    email: Joi.string()
      .email()
      .required(),

    motDePasse: Joi.string()
      .required()
  });