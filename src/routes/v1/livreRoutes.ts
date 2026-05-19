import express from "express";

import {
  createLivre,
  getAllLivres,
  getLivreById,
  updateLivre,
  deleteLivre
} from "../../controllers/livreController";

import { validateRequest } from "../../middlewares/validateRequest";
import {
  createLivreSchema,
  updateLivreSchema
} from "../../validations/livreValidation";

const router = express.Router();

router
  .route("/")
  .get(getAllLivres)
  .post(validateRequest(createLivreSchema), createLivre);

router
  .route("/:id")
  .get(getLivreById)
  .put(validateRequest(updateLivreSchema), updateLivre)
  .delete(deleteLivre);

export default router;