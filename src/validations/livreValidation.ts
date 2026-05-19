import Joi from "joi";

export const createLivreSchema = Joi.object({
  titre: Joi.string().trim().required(),
  auteur: Joi.string().required(),
  isbn: Joi.string().trim().required(),
  categorie: Joi.string().valid(
    "Roman",
    "Science",
    "Histoire",
    "Informatique",
    "Philosophie",
    "Autre"
  ),
  anneeEdition: Joi.number().min(1000).max(new Date().getFullYear()).required(),
  disponible: Joi.boolean()
});

export const updateLivreSchema = createLivreSchema.fork(
  ["titre", "auteur", "isbn", "anneeEdition"],
  (schema: any) => schema.optional()
);