import Joi from "joi";

export const createAuteurSchema = Joi.object({
  nom: Joi.string().trim().max(60).required().messages({
    "string.empty": "Le nom est obligatoire"
  }),

  prenom: Joi.string().trim().max(60).required().messages({
    "string.empty": "Le prénom est obligatoire"
  }),

  nationalite: Joi.string().trim().allow("", null),

  dateNaissance: Joi.date().required().messages({
    "date.base": "La date de naissance est invalide"
  }),

  description: Joi.string().max(1000).allow("", null)
});

export const updateAuteurSchema = createAuteurSchema.fork(
  ["nom", "prenom", "dateNaissance"],
  (schema) => schema.optional()
);