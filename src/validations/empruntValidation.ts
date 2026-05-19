import Joi from "joi";

export const createEmpruntSchema = Joi.object({
  livre: Joi.string().required(),
  lecteur: Joi.string().trim().required(),
  dateRetourPrevue: Joi.date().required(),
  statut: Joi.string().valid("en_cours", "retourne", "retard")
});

export const updateEmpruntSchema = createEmpruntSchema.fork(
  ["livre", "lecteur", "dateRetourPrevue"],
  (schema: any) => schema.optional()
);