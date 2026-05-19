import express from "express";
import {
  createAuteur,
  getAllAuteurs,
  getAuteurById,
  updateAuteur,
  deleteAuteur
} from "../../controllers/auteurController";

import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAuteurSchema,
  updateAuteurSchema
} from "../../validations/auteurValidation";

const router = express.Router();

router
  .route("/")
  .get(getAllAuteurs)
  .post(validateRequest(createAuteurSchema), createAuteur);

router
  .route("/:id")
  .get(getAuteurById)
  .put(validateRequest(updateAuteurSchema), updateAuteur)
  .delete(deleteAuteur);

export default router;