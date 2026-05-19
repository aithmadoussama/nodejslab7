import express from "express";

import {
  createEmprunt,
  getAllEmprunts,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt
} from "../../controllers/empruntController";

import { validateRequest } from "../../middlewares/validateRequest";
import {
  createEmpruntSchema,
  updateEmpruntSchema
} from "../../validations/empruntValidation";

const router = express.Router();

router
  .route("/")
  .get(getAllEmprunts)
  .post(validateRequest(createEmpruntSchema), createEmprunt);

router
  .route("/:id")
  .get(getEmpruntById)
  .put(validateRequest(updateEmpruntSchema), updateEmprunt)
  .delete(deleteEmprunt);

export default router;